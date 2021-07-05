/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';

import { validSubjectRequestData } from '../helper/validation';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';

interface SubjectRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addSubject(ctx: Context) {
  const requestData: SubjectRequestI = ctx.request.body;
  const validRequestData: boolean = validSubjectRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('subject', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query = 'insert into subject (id, name) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [id, name]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `subject with id: ${id} created`,
      };
    } else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getSubjects(ctx: Context) {
  try {
    await dbSetPath();
    const allSubjectsOuery: QueryResult<any> = await dbQuery('select * from subject');
    const allSubjects = allSubjectsOuery.rows;

    ctx.body = {
      count: allSubjects.length,
      data: allSubjects,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getSubjectStudents(ctx: Context) {
  try {
    await dbSetPath();
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const joinTableQuery = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.subject_id = '${subject_id}'
    `;

    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntryQuery: QueryResult<any> = await dbQuery(`select count(*) as total from ${joinTableQuery}`);
    const totalEntry: number = totalEntryQuery.rows[0].total;

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalEntry,
    };
    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalEntry);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const query = `
      select distinct student.id, student.name, student.sex, student.age
      from ${joinTableQuery}
      offset $1 limit $2
    `;
    const result: QueryResult<any> = await dbQuery(query, [boundary.offset, boundary.limit]);
    const students = result.rows;

    ctx.body = {
      total_students: totalEntry,
      data: students,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

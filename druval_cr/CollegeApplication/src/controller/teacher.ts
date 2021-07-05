/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';

import { validPersonRequestData } from '../helper/validation';
import { getGenderNotation } from '../helper/general';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';

interface PersonRequestI {
  name?: any;
  sex?: any;
  age?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addTeacher(ctx: Context) {
  const requestData: PersonRequestI = ctx.request.body;
  const validRequestData: boolean = validPersonRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex ? getGenderNotation(requestData.sex) : null;
    const age: number = requestData.age ? requestData.age : null;

    const query = 'insert into teacher (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `teacher with id: ${id} created`,
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

export async function getTeachers(ctx: Context) {
  try {
    await dbSetPath();
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalTeacherQuery: QueryResult<any> = await dbQuery('select count(*) as total from teacher');
    const totalTeacher: number = totalTeacherQuery.rows[0].total;

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalTeacher,
    };
    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalTeacher);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const allTeachersQuery: QueryResult<any> = await dbQuery('select * from teacher offset $1 limit $2', [
      boundary.offset,
      boundary.limit,
    ]);
    const allTeachers = allTeachersQuery.rows;

    ctx.body = {
      total_teachers: totalTeacher,
      data: allTeachers,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getTeacherStudents(ctx: Context) {
  try {
    await dbSetPath();
    const teacher_id: string = ctx.params.teacher_id;
    if (!uuidValidate(teacher_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validTeacher: boolean = await checkExistByUniqueKeys('teacher', ['id'], [teacher_id]);
    if (!validTeacher) {
      ctx.status = 400;
      ctx.body = 'invalid teacher id';
      return;
    }

    const joinTableQuery = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.teacher_id = '${teacher_id}'
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

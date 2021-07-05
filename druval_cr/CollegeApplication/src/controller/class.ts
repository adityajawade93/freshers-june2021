/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';

import { validClassRequestData } from '../helper/validation';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';

interface ClassRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addClass(ctx: Context) {
  const requestData: ClassRequestI = ctx.request.body;
  const validRequestData: boolean = validClassRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('class', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const query = 'insert into class (id, name) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [id, name]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `class with id: ${id} created`,
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

export async function getClasses(ctx: Context) {
  try {
    await dbSetPath();
    const allClassesOuery: QueryResult<any> = await dbQuery('select * from class');
    const allClasses = allClassesOuery.rows;

    ctx.body = {
      count: allClasses.length,
      data: allClasses,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getClassStudents(ctx: Context) {
  try {
    await dbSetPath();
    const class_id: string = ctx.params.class_id;
    if (!uuidValidate(class_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }

    const joinTableQuery = `
      student
      inner join student_class on student.id = student_class.student_id
      where student_class.class_id = '${class_id}'
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
      select student.id, student.name, student.sex, student.age
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

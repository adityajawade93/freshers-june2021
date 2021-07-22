/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addTeacher(id: string, name: string, sex: string | null, age: number | null) {
  try {
    const query = 'insert into teacher (id, name, sex, age) values ($1, $2, $3, $4)';
    const [, resultError] = await handle(dbQuery(query, [id, name, sex, age]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function countTeachers() {
  try {
    const query = 'select count(*) as total from teacher';
    const [result, resultError] = await handle(dbQuery(query));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows[0].total;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getTeachers(offset: number | null, limit: number | null) {
  try {
    // offset = null & limit = null ==> fetches all data
    const query = `select * from teacher offset ${offset} limit ${limit}`;
    const [result, resultError] = await handle(dbQuery(query));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getTeacherStudents(
  id: string,
  params: { action: string; payload?: { offset: number; limit: number } | null },
) {
  try {
    const joinTableQuery = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.teacher_id = $1
    `;

    let query;
    let queryResult, queryResultError;
    let result = null;

    switch (params.action) {
      case 'count':
        query = `select count(*) as total from ${joinTableQuery}`;
        [queryResult, queryResultError] = await handle(dbQuery(query, [id]));
        if (queryResultError) throw new CError(queryResultError.message, 400);
        result = queryResult.rows[0].total;
        break;
      default:
        query = `select distinct student.id, student.name, student.sex, student.age from ${joinTableQuery}`;
        if (params.payload != null) {
          query += ` offset ${params.payload.offset} limit ${params.payload.limit}`;
        }
        [queryResult, queryResultError] = await handle(dbQuery(query, [id]));
        if (queryResultError) throw new CError(queryResultError.message, 400);
        result = queryResult.rows;
        break;
    }
    return result;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

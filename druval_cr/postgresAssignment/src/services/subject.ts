/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addSubject(id: string, name: string) {
  try {
    const query = 'insert into subject (id, name) values ($1, $2)';
    const [, resultError] = await handle(dbQuery(query, [id, name]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getSubjects() {
  try {
    const query = 'select * from subject';
    const [result, resultError] = await handle(dbQuery(query));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getSubjectId(name: string) {
  try {
    const query = 'select id from subject where name = $1';
    const [result, resultError] = await handle(dbQuery(query, [name]));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows[0].id;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getSubjectStudents(
  id: string,
  params: { action: string; payload?: { offset: number; limit: number } | null },
) {
  try {
    const joinTableQuery = `
      student
      inner join student_class on student.id = student_class.student_id
      inner join schedule on schedule.class_id = student_class.class_id
      where schedule.subject_id = $1
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

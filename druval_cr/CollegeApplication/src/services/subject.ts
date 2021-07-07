/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from 'pg';
import { query as dbQuery } from '../database/index';

export async function addSubject(id: string, name: string) {
  try {
    const query = 'insert into subject (id, name) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [id, name]);

    if (result && result.command === 'INSERT') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

export async function getSubjects() {
  try {
    const query = 'select * from subject';
    const result: QueryResult<any> = await dbQuery(query);

    return result.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function getSubjectId(name: string) {
  try {
    const query = 'select id from subject where name = $1';
    const result: QueryResult<any> = await dbQuery(query, [name]);

    return result.rows[0].id;
  } catch (e) {
    throw Error(e);
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

    let query: string;
    let resultQuery: QueryResult<any>;
    let result;
    switch (params.action) {
      case 'count':
        query = `select count(*) as total from ${joinTableQuery}`;
        resultQuery = await dbQuery(query, [id]);
        result = resultQuery.rows[0].total;
        break;
      default:
        query = `select distinct student.id, student.name, student.sex, student.age from ${joinTableQuery}`;
        if (params.payload != null && params.payload.offset != null && params.payload.limit != null) {
          query += ` offset ${params.payload.offset} limit ${params.payload.limit}`;
        }
        resultQuery = await dbQuery(query, [id]);
        result = resultQuery.rows;
        break;
    }
    return result;
  } catch (e) {
    throw Error(e);
  }
}

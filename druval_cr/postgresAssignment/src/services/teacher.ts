/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from 'pg';
import { query as dbQuery } from '../database/index';

export async function addTeacher(id: string, name: string, sex: string | null, age: number | null) {
  try {
    const query = 'insert into teacher (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);

    if (result && result.command === 'INSERT') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

export async function countTeachers() {
  try {
    const query = 'select count(*) as total from teacher';
    const result: QueryResult<any> = await dbQuery(query);

    return result.rows[0].total;
  } catch (e) {
    throw Error(e);
  }
}

export async function getTeachers(offset: number | null, limit: number | null) {
  try {
    let query = 'select * from teacher';
    if (offset != null && limit != null) query += ` offset ${offset} limit ${limit}`;

    const result: QueryResult<any> = await dbQuery(query);

    return result.rows;
  } catch (e) {
    throw Error(e);
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

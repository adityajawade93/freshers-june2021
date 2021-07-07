/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from 'pg';
import { query as dbQuery } from '../database/index';

export async function addStudent(id: string, name: string, sex: string | null, age: number | null) {
  try {
    const query = 'insert into student (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);

    if (result && result.command === 'INSERT') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

export async function countStudents() {
  try {
    const query = 'select count(*) as total from student';
    const result: QueryResult<any> = await dbQuery(query);

    return result.rows[0].total;
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudents(offset: number | null, limit: number | null) {
  try {
    let query = 'select * from student';
    if (offset != null && limit != null) query += ` offset ${offset} limit ${limit}`;

    const result: QueryResult<any> = await dbQuery(query);

    return result.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentMarks(id: string) {
  try {
    const query = `
      select subject.name as subject, mark.marks
      from mark
      inner join student on student.id = mark.student_id
      inner join subject on subject.id = mark.subject_id
      where mark.student_id = $1
    `;
    const result: QueryResult<any> = await dbQuery(query, [id]);
    return result.rows;
  } catch (e) {
    throw Error(e);
  }
}

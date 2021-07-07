/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addStudent(id: string, name: string, sex: string | null, age: number | null) {
  try {
    const query = 'insert into student (id, name, sex, age) values ($1, $2, $3, $4)';
    const [, resultError] = await handle(dbQuery(query, [id, name, sex, age]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function countStudents() {
  try {
    const query = 'select count(*) as total from student';
    const [result, resultError] = await handle(dbQuery(query));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows[0].total;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getStudents(offset: number | null, limit: number | null) {
  try {
    // offset = null & limit = null ==> fetches all data
    const query = `select * from student offset ${offset} limit ${limit}`;
    const [result, resultError] = await handle(dbQuery(query));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
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
    const [result, resultError] = await handle(dbQuery(query, [id]));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

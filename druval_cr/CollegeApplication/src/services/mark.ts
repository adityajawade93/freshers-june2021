/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from 'pg';
import { query as dbQuery } from '../database/index';

export async function addMark(student_id: string, subject_id: string, marks: number) {
  try {
    const query = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
    const result: QueryResult<any> = await dbQuery(query, [student_id, subject_id, marks]);

    if (result && result.command === 'INSERT') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

export async function updateMark(marks: number, student_id: string, subject_id: string) {
  try {
    const query = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
    const result: QueryResult<any> = await dbQuery(query, [marks, student_id, subject_id]);

    if (result && result.command === 'UPDATE') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

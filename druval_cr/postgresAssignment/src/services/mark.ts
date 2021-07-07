/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addMark(student_id: string, subject_id: string, marks: number) {
  try {
    const query = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
    const [, resultError] = await handle(dbQuery(query, [student_id, subject_id, marks]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function updateMark(marks: number, student_id: string, subject_id: string) {
  try {
    const query = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
    const [, resultError] = await handle(dbQuery(query, [marks, student_id, subject_id]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

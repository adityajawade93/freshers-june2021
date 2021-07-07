/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from 'pg';
import { query as dbQuery } from '../database/index';

export async function addSchedule(subject_id: string, class_id: string, teacher_id: string) {
  try {
    const query = 'insert into schedule (subject_id, class_id, teacher_id) values ($1, $2, $3)';
    const result: QueryResult<any> = await dbQuery(query, [subject_id, class_id, teacher_id]);

    if (result && result.command === 'INSERT') return true;
    return false;
  } catch (e) {
    throw Error(e);
  }
}

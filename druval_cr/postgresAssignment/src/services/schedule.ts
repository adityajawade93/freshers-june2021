/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addSchedule(subject_id: string, class_id: string, teacher_id: string) {
  try {
    const query = 'insert into schedule (subject_id, class_id, teacher_id) values ($1, $2, $3)';
    const [, resultError] = await handle(dbQuery(query, [subject_id, class_id, teacher_id]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

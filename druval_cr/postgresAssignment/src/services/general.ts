/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../database/index';
import { handle } from './index';
import { CError } from '../CustomError/index';

export async function addStudentToClass(student_id: string, class_id: string) {
  try {
    const query = 'insert into student_class (student_id, class_id) values ($1, $2)';
    const [, resultError] = await handle(dbQuery(query, [student_id, class_id]));
    if (resultError) throw new CError(resultError.message, 400);
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function getTopper(subject_id: string, class_id: string) {
  try {
    const query = `
      select student.name, student.age, student.sex, mark.marks
      from student
      inner join student_class on student.id = student_class.student_id
      inner join mark on student.id = mark.student_id
      where mark.subject_id = $1 and student_class.class_id = $2
      order by mark.marks desc limit 1;
    `;
    const [result, resultError] = await handle(dbQuery(query, [subject_id, class_id]));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

export async function fetchClassLeaderboard(class_id: string, leaderboardLength: number) {
  try {
    const query = `
      select student.name, student.age, student.sex, SUM(mark.marks)
      from student
      inner join student_class on student.id = student_class.student_id
      inner join mark on student.id = mark.student_id
      where student_class.class_id = $1
      group by student.id
      order by SUM(mark.marks) desc
      limit $2
  `;
    const [result, resultError] = await handle(dbQuery(query, [class_id, leaderboardLength]));
    if (resultError) throw new CError(resultError.message, 400);
    return result.rows;
  } catch (e) {
    throw new CError(e.message, e.status);
  }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { QueryResult } from 'pg';

import { validStudentToClassRequestData } from '../helper/validation';

interface ClassObjI {
  name: string;
  id: string;
}

interface StudentToClassRequestI {
  student_id?: any;
  class_name?: any;
}

interface ClassLeaderboardI {
  [key: string]: Record<string, unknown>;
}

export async function addStudentToClass(ctx: Context) {
  const requestData: StudentToClassRequestI = ctx.request.body;
  const validRequestData: boolean = validStudentToClassRequestData(requestData);
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const class_name: string = requestData.class_name.toLowerCase();

    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    const validClass: boolean = await checkExistByUniqueKeys('class', ['name'], [class_name]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class name';
      return;
    }
    // note that the class is valid
    const classResult: QueryResult<any> = await dbQuery('select id from class where name = $1', [class_name]);
    const class_id: string = classResult.rows[0].id;

    const duplicate: boolean = await checkExistByUniqueKeys('student_class', ['student_id'], [student_id]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'student is already alotted a class';
      return;
    }

    const query = 'insert into student_class (student_id, class_id) values ($1, $2)';
    const result: QueryResult<any> = await dbQuery(query, [student_id, class_id]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: 'added student to class',
      };
    } else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getTopper(ctx: Context) {
  try {
    await dbSetPath();
    const class_id: string = ctx.params.class_id;
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(class_id) || !uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }

    const query = `
      select student.name, student.age, student.sex, mark.marks
      from student
      inner join student_class on student.id = student_class.student_id
      inner join mark on student.id = mark.student_id
      where mark.subject_id = $1 and student_class.class_id = $2
      order by mark.marks desc limit 1;
    `;
    const result: QueryResult<any> = await dbQuery(query, [subject_id, class_id]);
    const topper = result.rows;
    ctx.body = {
      data: topper,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

function fetchClassLeaderboard(classInfo: ClassObjI, leaderboardLength: number) {
  const query = `
    select student.name, student.age, student.sex, SUM(mark.marks)
    from student
    inner join student_class on student.id = student_class.student_id
    inner join mark on student.id = mark.student_id
    where student_class.class_id = $1
    group by student.id
    order by SUM(mark.marks) desc
    limit ${leaderboardLength}
  `;
  return dbQuery(query, [classInfo.id]);
}

function reductiveLeaderboard(allClasses: ClassObjI[], result: any[], leaderboardLength: number) {
  return allClasses.reduce(
    (chain: any, classInfo: ClassObjI) =>
      chain.then((value: { rows: Record<string, unknown> }) => {
        // base condition promise won't have data
        if (value) result.push(value.rows);
        return fetchClassLeaderboard(classInfo, leaderboardLength);

        // base condition
      }),
    Promise.resolve(),
  );
}

export async function getLeaderboard(ctx: Context) {
  const leaderboardLength = 3;
  try {
    await dbSetPath();
    const allClassesOuery: QueryResult<any> = await dbQuery('select * from class');
    const allClasses: ClassObjI[] = allClassesOuery.rows;

    const combinedleaderboard: ClassLeaderboardI = {};
    const tempResult: any[] = [];

    const tailResult = await reductiveLeaderboard(allClasses, tempResult, leaderboardLength);
    tempResult.push(tailResult.rows);

    for (let index = 0; index < allClasses.length; index++) {
      const classInfo: ClassObjI = allClasses[index];
      combinedleaderboard[classInfo.name] = tempResult[index];
    }
    ctx.body = {
      data: combinedleaderboard,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

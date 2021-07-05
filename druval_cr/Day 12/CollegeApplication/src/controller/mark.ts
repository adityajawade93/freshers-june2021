/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { QueryResult } from 'pg';

import { validMarkRequestData } from '../helper/validation';

interface MarkRequestI {
  student_id?: any;
  subject_name?: any;
  marks?: any;
}

export async function addMarks(ctx: Context) {
  const requestData: MarkRequestI = ctx.request.body;
  const validRequestData: boolean =
    validMarkRequestData(requestData) && requestData.student_id && requestData.subject_name && requestData.marks;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['name'], [subject_name]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject name';
      return;
    }
    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    // note that the subject is valid
    const subjectResult: QueryResult<any> = await dbQuery('select id from subject where name = $1', [subject_name]);
    const subject_id: string = subjectResult.rows[0].id;

    const duplicate: boolean = await checkExistByUniqueKeys(
      'mark',
      ['student_id', 'subject_id'],
      [student_id, subject_id],
    );
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }

    const query = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
    const result: QueryResult<any> = await dbQuery(query, [student_id, subject_id, marks]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: 'added the student result',
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

export async function updateMarks(ctx: Context) {
  const requestData: MarkRequestI = ctx.request.body;
  const validRequestData: boolean =
    validMarkRequestData(requestData) && requestData.student_id && requestData.subject_name && requestData.marks;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['name'], [subject_name]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject name';
      return;
    }
    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }
    // note that the subject is valid
    const subjectResult: QueryResult<any> = await dbQuery('select id from subject where name = $1', [subject_name]);
    const subject_id: string = subjectResult.rows[0].id;

    const entryExists: boolean = await checkExistByUniqueKeys(
      'mark',
      ['student_id', 'subject_id'],
      [student_id, subject_id],
    );
    if (!entryExists) {
      ctx.status = 400;
      ctx.body = "entry doesn't exists";
      return;
    }
    const query = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
    const result: QueryResult<any> = await dbQuery(query, [marks, student_id, subject_id]);
    if (result && result.command === 'UPDATE') {
      ctx.body = {
        message: 'updated the student result',
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

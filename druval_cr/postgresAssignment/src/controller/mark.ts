/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';

import { validMarkRequestData } from '../helper/validation';
import * as subjectService from '../services/subject';
import * as markService from '../services/mark';

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
    const subject_id: string = await subjectService.getSubjectId(subject_name);

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

    const result: boolean = await markService.addMark(student_id, subject_id, marks);
    if (result) {
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
    const subject_id: string = await subjectService.getSubjectId(subject_name);

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
    const result: boolean = await markService.updateMark(marks, student_id, subject_id);
    if (result) {
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

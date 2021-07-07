/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import * as subjectService from '../services/subject';
import * as markService from '../services/mark';
import markSchema from '../database/helper/validateSchema/markSchema';

interface MarkRequestI {
  student_id?: any;
  subject_name?: any;
  marks?: any;
}

export async function addMarks(ctx: Context) {
  try {
    const requestData: MarkRequestI = ctx.request.body;
    await markSchema.validateAsync(requestData);
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    const subject_id: string = await subjectService.getSubjectId(subject_name);

    await markService.addMark(student_id, subject_id, marks);

    ctx.body = {
      message: `marks for student with ${student_id} is added`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function updateMarks(ctx: Context) {
  try {
    const requestData: MarkRequestI = ctx.request.body;
    await markSchema.validateAsync(requestData);
    const student_id: string = requestData.student_id;
    const subject_name: string = requestData.subject_name.toLowerCase();
    const marks: number = requestData.marks;
    const subject_id: string = await subjectService.getSubjectId(subject_name);

    await markService.updateMark(marks, student_id, subject_id);
    ctx.body = {
      message: `marks for student with ${student_id} is updated`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { validScheduleRequestData } from '../helper/validation';
import * as subjectService from '../services/subject';
import * as classService from '../services/class';
import * as scheduleService from '../services/schedule';

interface ScheduleRequestI {
  subject_name?: any;
  class_name?: any;
  teacher_id?: any;
}

export async function addSchedule(ctx: Context) {
  const requestData: ScheduleRequestI = ctx.request.body;
  const validRequestData: boolean =
    validScheduleRequestData(requestData) &&
    requestData.subject_name &&
    requestData.class_name &&
    requestData.teacher_id;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    const subject_name: string = requestData.subject_name.toLowerCase();
    const class_name: string = requestData.class_name.toLowerCase();
    const teacher_id: string = requestData.teacher_id;
    if (!uuidValidate(teacher_id)) {
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
    const validClass: boolean = await checkExistByUniqueKeys('class', ['name'], [class_name]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class name';
      return;
    }
    const validTeacher: boolean = await checkExistByUniqueKeys('teacher', ['id'], [teacher_id]);
    if (!validTeacher) {
      ctx.status = 400;
      ctx.body = 'invalid teacher id';
      return;
    }
    const class_id: string = await classService.getClassId(class_name);
    const subject_id: string = await subjectService.getSubjectId(subject_name);

    const duplicate: boolean = await checkExistByUniqueKeys(
      'schedule',
      ['subject_id', 'class_id', 'teacher_id'],
      [subject_id, class_id, teacher_id],
    );
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }

    const result: boolean = await scheduleService.addSchedule(subject_id, class_id, teacher_id);
    if (result) {
      ctx.body = {
        message: 'added schedule',
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

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import * as subjectService from '../services/subject';
import * as classService from '../services/class';
import * as scheduleService from '../services/schedule';
import scheduleSchema from '../database/helper/validateSchema/scheduleSchema';

interface ScheduleRequestI {
  subject_name?: any;
  class_name?: any;
  teacher_id?: any;
}

export async function addSchedule(ctx: Context) {
  try {
    const requestData: ScheduleRequestI = ctx.request.body;
    await scheduleSchema.validateAsync(requestData);
    const subject_name: string = requestData.subject_name.toLowerCase();
    const class_name: string = requestData.class_name.toLowerCase();
    const teacher_id: string = requestData.teacher_id;
    const class_id: string = await classService.getClassId(class_name);
    const subject_id: string = await subjectService.getSubjectId(subject_name);

    await scheduleService.addSchedule(subject_id, class_id, teacher_id);
    ctx.body = {
      message: `schedule added`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

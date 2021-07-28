import { Context } from 'vm';

import addClassScheduleI from '../services/schedule';
import addClassScheduleSchema from '../helper/schedulevalidation';

interface ISchedule{
    classid:number;
    classno:number;
    subj_id:number;
    subj_name:string;
    t_id:number;
    t_fname:string;
}

export default async function addClassSchedule(ctx: Context) {
  const req:ISchedule = ctx.request.body;
  const reqBody = await addClassScheduleSchema.validateAsync(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await addClassScheduleI(req.classid, req.classno, req.subj_id,
      req.subj_name, req.t_id, req.t_fname);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Class_schedule table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

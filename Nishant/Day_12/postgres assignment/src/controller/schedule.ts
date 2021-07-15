/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import * as serviceschedule from '../services/schedule';

interface ISchedule{
    classid:number;
    classno:number;
    subj_id:number;
    subj_name:string;
    t_id:number;
    t_fname:string;
}

export async function addClassSchedule(ctx: Context) {
  try {
    const req:ISchedule = ctx.request.body;
    if (req.classid === undefined || req.classno === undefined || req.subj_id === undefined || req.subj_name === undefined || req.t_id === undefined || req.t_fname === undefined) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (typeof req.classid !== 'number' || typeof req.classno !== 'number' || typeof req.subj_id !== 'number' || typeof req.subj_name !== 'string' || typeof req.t_id !== 'number' || typeof req.t_fname !== 'string') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (req.subj_name.trim() === '' || req.t_fname.trim() === '') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    await serviceschedule.addClassScheduleService(req.classid, req.classno, req.subj_id, req.subj_name, req.t_id, req.t_fname);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Class_schedule table';
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

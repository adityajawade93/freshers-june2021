/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import * as serviceclass from '../services/class';

interface ISchedule{
    classid:number;
    classno:number;
    subj_id:number;
    subj_name:string;
    t_id:number;
    t_fname:string;
}

interface IClass{
    class_id:number;
    studid:number
}

interface IStudentDetails{
    student_id:number;
    fname:string;
}

export async function getClass(ctx: Context) {
  try {
    let [rows]: Array<{rows: ISchedule}> = [];
    rows = await serviceclass.get_class();
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getStudentByClassId(ctx: Context) {
  try {
    const classId:number = parseInt(ctx.params.classId);
    if (classId === undefined || typeof classId !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    let [rows]: Array<{rows: IStudentDetails}> = [];
    rows = await serviceclass.get_student_by_classid(classId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addStudentInClass(ctx: Context) {
  try {
    const req:IClass = ctx.request.body;
    if (req.class_id === undefined || req.studid === undefined || typeof req.class_id !== 'number' || typeof req.studid !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    await serviceclass.add_student_in_class(req.class_id, req.studid);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Class_student table';
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

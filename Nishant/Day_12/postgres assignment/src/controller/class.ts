/* eslint-disable radix */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import * as serviceclass from '../services/class';
import * as validateclass from '../helper/classvalidation';

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
    rows = await serviceclass.getClassService();
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getStudentByClassId(ctx: Context) {
  try {
    const classId:number = parseInt(ctx.params.classId);
    await validateclass.getStudentByClassIdSchema.validateAsync(classId);
    let [rows]: Array<{rows: IStudentDetails}> = [];
    rows = await serviceclass.getStudentByClassIdService(classId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    if (e.isJoi === true) {
      ctx.response.status = 422;
      ctx.response.type = 'text/html';
      ctx.body = 'unprocessable entity';
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = 'internal server error';
    }
  }
}

export async function addStudentInClass(ctx: Context) {
  try {
    const req:IClass = ctx.request.body;
    await validateclass.addStudentInClassSchema.validateAsync(req);
    await serviceclass.addStudentInClassService(req.class_id, req.studid);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Class_student table';
  } catch (e) {
    if (e.isJoi === true) {
      ctx.response.status = 422;
      ctx.response.type = 'text/html';
      ctx.body = 'unprocessable entity';
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = 'internal server error';
    }
  }
}

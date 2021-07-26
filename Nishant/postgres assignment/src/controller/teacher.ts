import { Context } from 'vm';

import { QueryResult } from 'pg';
import * as serviceteacher from '../services/teacher';
import * as validateteacher from '../helper/teachervalidation';

interface ITeacher{
    teacher_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: string;
    address:string;
}

export async function getTeacher(ctx: Context) {
  try {
    const rows:QueryResult = await serviceteacher.getTeacherService();

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getStudentByTeacherId(ctx: Context) {
  try {
    let { teacherId }:{teacherId:number} = ctx.params;
    teacherId = Number(teacherId);
    await validateteacher.getStudentByTeacherIdSchema.validateAsync(teacherId);
    const rows:QueryResult = await serviceteacher.getStudentByTeacherIdService(teacherId);

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

export async function addTeacher(ctx: Context) {
  try {
    const req:ITeacher = ctx.request.body;
    await validateteacher.addTeacherSchema.validateAsync(req);
    await serviceteacher.addTeacherService(req.teacher_id, req.fname, req.mname, req.lname,
      req.dob, req.gender, req.address);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in teacher table';
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

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
    const rows:QueryResult = await serviceteacher.getTeacher();

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
  let { teacherId }:{teacherId:number} = ctx.params;
  teacherId = Number(teacherId);
  const reqBody = validateteacher.getStudentByTeacherIdSchema.validate(ctx.params);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    const rows:QueryResult = await serviceteacher.getStudentByTeacherId(teacherId);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addTeacher(ctx: Context) {
  const req:ITeacher = ctx.request.body;
  const reqBody = validateteacher.addTeacherSchema.validate(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await serviceteacher.addTeacher(req.teacher_id, req.fname, req.mname, req.lname,
      req.dob, req.gender, req.address);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in teacher table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

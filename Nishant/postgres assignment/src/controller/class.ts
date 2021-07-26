import { Context } from 'vm';

import { QueryResult } from 'pg';
import * as serviceclass from '../services/class';
import * as validateclass from '../helper/classvalidation';

interface IClass{
    class_id:number;
    studid:number
}

export async function getClass(ctx: Context) {
  try {
    const rows : QueryResult = await serviceclass.getClassService();
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
  const classId:number = parseInt(ctx.params.classId);
  try {
    await validateclass.getStudentByClassIdSchema.validateAsync(classId);
    const rows:QueryResult = await serviceclass.getStudentByClassIdService(classId);
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
  const req:IClass = ctx.request.body;
  try {
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

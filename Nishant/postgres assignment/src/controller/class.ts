import { Context } from 'vm';

import { QueryResult } from 'pg';
import { error } from 'console';
import * as serviceclass from '../services/class';
import * as validateclass from '../helper/classvalidation';

interface IClass{
    class_id:number;
    studid:number
}

export async function getClass(ctx: Context) {
  try {
    const rows : QueryResult = await serviceclass.getClass();
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
  const Id:number = parseInt(ctx.params.classId);
  const data = {
    classId: Id,
  };
  const reqBody = await validateclass.getStudentByClassIdSchema.validateAsync(data);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    const rows:QueryResult = await serviceclass.getStudentByClassId(Id);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addStudentInClass(ctx: Context) {
  const req:IClass = ctx.request.body;
  const reqBody = await validateclass.addStudentInClassSchema.validate(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await serviceclass.addStudentInClass(req.class_id, req.studid);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.response.body = 'data is inserted in Class_student table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

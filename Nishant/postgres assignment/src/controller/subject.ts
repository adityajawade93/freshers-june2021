import { Context } from 'vm';

import { QueryResult } from 'pg';
import * as servicesubject from '../services/subject';
import * as validatesubject from '../helper/subjectvalidation';

interface ISubject{
    subject_id:number;
    subject_name:string;
}

export async function getSubject(ctx: Context) {
  try {
    const rows : QueryResult = await servicesubject.getSubject();

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getStudentBySubjectId(ctx: Context) {
  let { subjectId }:{subjectId:number} = ctx.params;
  subjectId = Number(subjectId);
  try {
    await validatesubject.getStudentBySubjectIdSchema.validateAsync(subjectId);
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
  }
  try {
    const rows:QueryResult = await servicesubject.getStudentBySubjectId(subjectId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getSubjectMarksByStudentId(ctx: Context) {
  let { studentId }:{studentId:number} = ctx.params;
  studentId = Number(studentId);
  const reqBody = await validatesubject.getSubjectMarksBySubjectIdSchema.validateAsync(studentId);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    const rows:QueryResult = await servicesubject.getSubjectMarksByStudentId(studentId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addSubject(ctx: Context) {
  const req:ISubject = ctx.request.body;
  const reqBody = await validatesubject.addSubjectSchema.validateAsync(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await servicesubject.addSubject(req.subject_id, req.subject_name);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Subject table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

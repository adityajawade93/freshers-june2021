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
    const rows : QueryResult = await servicesubject.getSubjectService();

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
    const rows:QueryResult = await servicesubject.getStudentBySubjectIdService(subjectId);
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

export async function getSubjectMarksByStudentId(ctx: Context) {
  let { studentId }:{studentId:number} = ctx.params;
  studentId = Number(studentId);
  try {
    await validatesubject.getSubjectMarksBySubjectIdSchema.validateAsync(studentId);
    const rows:QueryResult = await servicesubject.getSubjectMarksByStudentIdService(studentId);
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

export async function addSubject(ctx: Context) {
  const req:ISubject = ctx.request.body;
  try {
    await validatesubject.addSubjectSchema.validateAsync(req);
    await servicesubject.addSubjectService(req.subject_id, req.subject_name);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Subject table';
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

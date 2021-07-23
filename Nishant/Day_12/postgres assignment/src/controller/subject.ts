/* eslint-disable camelcase */
import { Context } from 'vm';

import * as servicesubject from '../services/subject';
import * as validatesubject from '../helper/subjectvalidation';

interface ISubject{
    subject_id:number;
    subject_name:string;
}

interface IStudentDetails{
    student_id:number;
    fname:string;
}

interface IMarks{
    subject_id:number;
    subject_name:string;
    marks:number;
}

export async function getSubject(ctx: Context) {
  try {
    let [rows]: Array<{rows: ISubject}> = [];
    rows = await servicesubject.getSubjectService();

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
  try {
    let { subjectId }:{subjectId:number} = ctx.params;
    subjectId = Number(subjectId);
    await validatesubject.getStudentBySubjectIdSchema.validateAsync(subjectId);
    let [rows]: Array<{rows: IStudentDetails}> = [];
    rows = await servicesubject.getStudentBySubjectIdService(subjectId);
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
  try {
    let { studentId }:{studentId:number} = ctx.params;
    studentId = Number(studentId);
    await validatesubject.getSubjectMarksBySubjectIdSchema.validateAsync(studentId);
    let [rows]: Array<{rows: IMarks}> = [];
    rows = await servicesubject.getSubjectMarksByStudentIdService(studentId);
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
  try {
    const req:ISubject = ctx.request.body;
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

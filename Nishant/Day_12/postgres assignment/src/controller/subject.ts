/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import * as servicesubject from '../services/subject';

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
    rows = await servicesubject.get_subject();

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
    if (subjectId === undefined || typeof subjectId !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    let [rows]: Array<{rows: IStudentDetails}> = [];
    rows = await servicesubject.get_student_by_subjectid(subjectId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function getSubjectMarksByStudentId(ctx: Context) {
  try {
    let { studentId }:{studentId:number} = ctx.params;
    studentId = Number(studentId);
    if (studentId === undefined || typeof studentId !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    let [rows]: Array<{rows: IMarks}> = [];
    rows = await servicesubject.get_subjectmarks_by_studentid(studentId);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addSubject(ctx: Context) {
  try {
    const req:ISubject = ctx.request.body;
    if (req.subject_id === undefined || req.subject_name === undefined || typeof req.subject_id !== 'number' || typeof req.subject_name !== 'string' || req.subject_name.trim() === '') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    await servicesubject.add_subject(req.subject_id, req.subject_name);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in Subject table';
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

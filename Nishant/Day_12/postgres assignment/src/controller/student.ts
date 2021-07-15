/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import * as studentService from '../services/student';

interface IStudent{
  student_id: number;
  fname:string;
  mname:string;
  lname:string;
  dob :Date;
  gender: CharacterData;
  address:string;
  slice(a:number, b:number): IStudent;
}

export async function getStudent(ctx: Context) {
  try {
    let [rows]: Array<{rows: IStudent}> = [];
    rows = await studentService.getStudentService();
    const length = await studentService.getStudentLengthService();
    const page = parseInt(ctx.request.query.page);
    const size = parseInt(ctx.request.query.size);
    const totalPages = Math.ceil(length.rows[0].count / size);
    if (page === undefined || size === undefined || typeof page !== 'number' || typeof size !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (page < 0 || size < 0 || page > totalPages) {
      ctx.response.status = 404;
      ctx.response.type = 'text/html';
      ctx.body = 'Not Found';
      return;
    }

    const startid = page * size;
    const endid = Math.min((page + 1) * size, length.rows[0].count);
    let req_data = rows.rows;
    req_data = (req_data).slice(startid, endid);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = req_data;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function addStudent(ctx: Context) {
  try {
    const req:IStudent = ctx.request.body;

    if (req.student_id === undefined || req.fname === undefined || req.mname === undefined || req.lname === undefined || req.dob === undefined || req.gender === undefined || req.address === undefined) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (req.fname.trim() === '' || req.mname.trim() === '' || req.lname.trim() === '' || req.address.trim() === '') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (typeof req.student_id !== 'number' || typeof req.fname !== 'string' || typeof req.mname !== 'string' || typeof req.lname !== 'string' || typeof req.dob !== 'string' || typeof req.gender !== 'string' || typeof req.address !== 'string') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    await studentService.addStudentService(req.student_id, req.fname, req.mname, req.lname, req.dob, req.gender, req.address);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in student table';
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

import { Context } from 'vm';
import { QueryResult } from 'pg';
import * as studentService from '../services/student';
import addStudentSchema from '../helper/studentvalidation';

interface IStudent{
  student_id: number;
  fname:string;
  mname:string;
  lname:string;
  dob :Date;
  gender: string;
  address:string;
  slice(a:number, b:number): IStudent;
}

export async function getStudent(ctx: Context) {
  try {
    const rows:QueryResult = await studentService.getStudent();
    const length = await studentService.getStudentLength();
    const page = parseInt(ctx.request.query.page);
    const size = parseInt(ctx.request.query.size);
    const totalPages = Math.ceil(length.rows[0].count / size);
    if (typeof page !== 'number' || typeof size !== 'number') {
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
  const req:IStudent = ctx.request.body;
  const reqBody = addStudentSchema.validate(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await studentService.addStudent(req.student_id, req.fname, req.mname, req.lname, req.dob,
      req.gender, req.address);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in student table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

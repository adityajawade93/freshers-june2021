import { Context } from "vm";

import * as studentService from "../services/student";
const validation = require('../helpers/validation_schema.ts');

interface student {
  roll_num: number;
  fname: string;
  lname: string;
  standard: number;
  subcode: number;
  slice(a: number, b: number): student;
}

export async function getStudent(ctx: Context) {
  try {
    let [rows]: Array<{ rows: student }> = [];
    let length: any;
    rows = await studentService.get_student();
    length = await studentService.get_student_length();
    const page = parseInt(ctx.request.query.page);
    const size = parseInt(ctx.request.query.size);
    const totalPages = Math.ceil(length.rows[0].count / size);
    if (
      page === undefined ||
      size === undefined ||
      typeof page !== "number" ||
      typeof size !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (page < 0 || size < 0 || page > totalPages) {
      ctx.response.status = 404;
      ctx.response.type = "text/html";
      ctx.body = "Not Found";
      return;
    }

    const start = page * size;
    const end = Math.min((page + 1) * size, length.rows[0].count);
    let req_data = rows.rows;
    req_data = req_data.slice(start, end);
    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = req_data;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

export async function addStudent(ctx: Context) {
  
    let req: student = ctx.request.body;
    const reqBody = await validation.studentSchema.validate(req);
    //console.log(reqBody);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      //console.log('validation error');
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;

    } 
    try{
    await studentService.add_student(
      req.roll_num,
      req.fname,
      req.lname,
      req.standard,
      req.subcode
    )
    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into student table";
  } catch (err){
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
 };
}


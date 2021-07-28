import { Context } from "vm";

import * as serviceteacher from "../services/teacher";
const validation = require('../helpers/validation_schema.ts');

interface teacher {
  staffid: number;
  fname: string;
  lname: string;
  subcode: number;
}

interface student_det {
  roll_num: number;
  fname: string;
  lname: string;
  standard: number;
}

export async function getTeacher(ctx: Context) {
  try {
    let [rows]: Array<{ rows: teacher }> = [];
    rows = await serviceteacher.get_teacher();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

export async function getStudentByStaffId(ctx: Context) {
 
    let id: number = parseInt(ctx.url.substring(9));
    //console.log(typeof id);
    //console.log(id);
    const reqBody = await validation.getstudentbyidSchema.validate(id);
    //console.log(reqBody);
   
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try {
    let [rows]: Array<{ rows: student_det }> = [];
    rows = await serviceteacher.get_student_by_staffid(id);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

export async function addTeacher(ctx: Context) {
  
    let req: teacher = ctx.request.body;
    const reqBody = await validation.teacherSchema.validate(req);
   
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
   try{
    await serviceteacher.add_teacher(
      req.staffid,
      req.fname,
      req.lname,
      req.subcode
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into teacher table";
  }catch (err){
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
 };
}

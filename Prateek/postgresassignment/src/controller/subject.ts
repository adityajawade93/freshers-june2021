import { Context } from "vm";

import * as servicesubject from "../services/subject";
const validation = require('../helpers/validation_schema.ts');

interface subject {
  subcode: number;
  subject: string;
  staffid: number;
}

interface student_det {
  roll_num: number;
  fname: string;
  lname: string;
  standard: number;
}

interface stud_marks {
  subcode: number;
  subject: string;
  marks: number;
}

export async function getSubject(ctx: Context) {
  try {
    let [rows]: Array<{ rows: subject }> = [];
    rows = await servicesubject.get_subject();

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

export async function getStudentBySubjectId(ctx: Context) {
  
    var id: number = parseInt(ctx.url.substring(9));
    const reqBody = await validation.getstudentbysubjectSchema.validate(id);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try {
    let [rows]: Array<{ rows: student_det }> = [];
    rows = await servicesubject.get_student_by_subjectid(id);
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

export async function getSubjectMarksByStudentId(ctx: Context) {
    var id: number = parseInt(ctx.url.substring(7));
    const reqBody = await validation.getstudentbysubjectSchema.validate(id);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try {
    let [rows]: Array<{ rows: stud_marks }> = [];
    rows = await servicesubject.get_subjectmarks_by_studentid(id);
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

export async function addSubject(ctx: any) {
  
    let req: subject = ctx.request.body;
    const reqBody = await validation.subjectSchema.validate(req);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try{
    await servicesubject.add_subject(req.subcode, req.subject, req.staffid);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into Subject table";
  } catch (err){
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
 };
}

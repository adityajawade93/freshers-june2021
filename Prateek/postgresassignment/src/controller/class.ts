import { Context } from "vm";

import * as serviceclass from "../services/class";
const validation = require('../helpers/validation_schema.ts');

interface class_schedule {
  uniclassid: string;
  Standard: number;
  classno: number;
  subcode: number;
  subject: string;
  staffid: number;
  T_fname: string;
}

interface student_det {
  roll_num: number;
  fname: string;
  lname: string;
  standard: number;
}

export async function getClass(ctx: Context) {
  try {
    let [rows]: Array<{ rows: class_schedule }> = [];
    rows = await serviceclass.get_class();
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

export async function getStudentByStandard(ctx: Context) {
  
    var id: number = parseInt(ctx.params.id);
    const reqBody = await validation.classSchema.validate(id);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try {
    let [rows]: Array<{ rows: student_det }> = [];
    rows = await serviceclass.get_student_by_standard(id);
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

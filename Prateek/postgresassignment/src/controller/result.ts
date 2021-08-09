import { Context } from "vm";

import * as serviceresult from "../services/result";
const validation = require('../helpers/validation_schema.ts');
interface marks_data {
  resultsid: number;
  roll_num: number;
  subcode: number;
  staffid: number;
  standard: number;
  marks: number;
}

interface marks_update {
  roll_num: number;
  subcode: number;
  marks: number;
}

export async function addMarks(ctx: Context) {
  
    let req: marks_data = ctx.request.body;
    const reqBody = await validation.resultSchema.validate(req);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try{
    await serviceresult.add_marks(
      req.resultsid,
      req.roll_num,
      req.subcode,
      req.staffid,
      req.standard,
      req.marks
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into Marks table";
  } catch (err){
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
 };
}

export async function updateResult(ctx: Context) {
  
    let req: marks_update = ctx.request.body;
    let [rows]: Array<{ rows: any }> = [];
    const reqBody = await validation.updateresultSchema.validate(req);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try {
    let flag = 0;
    rows = await serviceresult.check_subject(req.roll_num);
    
    
    //console.log('this',rows.rows[0].subcode);
  
    if (req.subcode === rows.rows[0].subcode) {
        flag = 1;
      }
  

    if (flag === 0) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "This subject is not opted by the student";
      return;
    }

    await serviceresult.update_result(req.roll_num, req.subcode, req.marks);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "marks updated in Marks table";
  } catch {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

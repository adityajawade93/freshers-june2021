import { Context } from "vm";

import * as serviceschedule from "../services/schedule";
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

export async function addClassSchedule(ctx: Context) {
  
    let req: class_schedule = ctx.request.body;
    const reqBody = await validation.scheduleSchema.validate(req);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;
    } 
    try{
    await serviceschedule.add_class_schedule(
      req.uniclassid,
      req.Standard,
      req.classno,
      req.subcode,
      req.subject,
      req.staffid,
      req.T_fname
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into Class_schedule table";
  }catch (err){
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
 };
}

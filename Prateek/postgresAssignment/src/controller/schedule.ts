import { Context } from "vm";

import * as serviceschedule from "../services/schedule";

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
  try {
    let req: class_schedule = ctx.request.body;
    if (
      req.uniclassid === undefined ||
      req.Standard === undefined ||
      req.classno === undefined ||
      req.subcode === undefined ||
      req.subject === undefined ||
      req.staffid === undefined ||
      req.T_fname === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.uniclassid !== "string" ||
      typeof req.Standard !== "number" ||
      typeof req.classno !== "number" ||
      typeof req.subcode !== "number" ||
      typeof req.subject !== "string" ||
      typeof req.staffid !== "number" ||
      typeof req.T_fname !== "string"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.subject.trim() === "" || req.T_fname.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
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
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

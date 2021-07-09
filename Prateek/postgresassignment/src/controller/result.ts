import { Context } from "vm";

import * as serviceresult from "../services/result";

interface marks_data {
  resultsid: number;
  roll_num: number;
  subcode: number;
  staffid: number;
  standard: number;
  marks: number;
}

export async function addMarks(ctx: Context) {
  try {
    let req: marks_data = ctx.request.body;
    if (
      req.resultsid === undefined ||
      req.roll_num === undefined ||
      req.subcode === undefined ||
      req.staffid === undefined ||
      req.standard === undefined ||
      req.marks === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.resultsid !== "number" ||
      typeof req.roll_num !== "number" ||
      typeof req.subcode !== "number" ||
      typeof req.staffid !== "number" ||
      typeof req.standard !== "number" ||
      typeof req.marks !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
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
  } catch {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

export async function updateResult(ctx: Context) {
  try {
    let req: marks_data = ctx.request.body;
    let [rows]: Array<{ rows: any }> = [];
    if (
      req.roll_num === undefined ||
      req.subcode === undefined ||
      req.marks === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.roll_num !== "number" ||
      typeof req.subcode !== "number" ||
      typeof req.marks !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let flag = 0;
    rows = await serviceresult.check_subject(req.roll_num);
    let length = await serviceresult.subject_length(req.roll_num);
    for (let i = 0; i < length.rows[0].count; i++) {
      if (req.subcode === rows.rows[i].subcode) {
        flag = 1;
        break;
      }
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

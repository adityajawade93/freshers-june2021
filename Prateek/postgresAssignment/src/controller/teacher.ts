import { Context } from "vm";

import * as serviceteacher from "../services/teacher";

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
  try {
    var id: number = parseInt(ctx.url.substring(9));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
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
  try {
    let req: teacher = ctx.request.body;
    if (
      req.staffid === undefined ||
      req.fname === undefined ||
      req.lname === undefined ||
      req.subcode === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.fname.trim() === "" || req.lname.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.staffid !== "number" ||
      typeof req.fname !== "string" ||
      typeof req.lname !== "string" ||
      typeof req.subcode !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await serviceteacher.add_teacher(
      req.staffid,
      req.fname,
      req.lname,
      req.subcode
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into teacher table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

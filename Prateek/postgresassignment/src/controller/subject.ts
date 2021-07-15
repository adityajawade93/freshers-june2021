import { Context } from "vm";

import * as servicesubject from "../services/subject";

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
  try {
    var id: number = parseInt(ctx.url.substring(9));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
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
  try {
    var id: number = parseInt(ctx.url.substring(7));
    if (id === undefined || typeof id !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
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
  try {
    let req: subject = ctx.request.body;
    if (
      req.subcode === undefined ||
      req.subject === undefined ||
      req.staffid === undefined ||
      typeof req.subcode !== "number" ||
      typeof req.staffid !== "number" ||
      typeof req.subject !== "string" ||
      req.subject.trim() === ""
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    await servicesubject.add_subject(req.subcode, req.subject, req.staffid);

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "data inserted into Subject table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

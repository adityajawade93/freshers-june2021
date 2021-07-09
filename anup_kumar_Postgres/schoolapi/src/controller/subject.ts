import {ValidatePage } from "../helper/index";
import { Context } from "vm";
import { AddSubject, AllSubjects, SubjectStudent } from "../services/subject";

export async function allSubjects(ctx: Context) {
  var page = parseInt(ctx.request.query.page);
  var size = parseInt(ctx.request.query.size);
  console.log(page);
  console.log(size);

  var isValid = ValidatePage(page, size);
  if (isValid.result === "valid") {
    let limit = size;
    let offset = page * size;
    try {
      const response = await AllSubjects(limit, offset);
      ctx.body = response.rows;
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  }
}

export async function subjectStudent(ctx: Context) {
  var id = ctx.params.id;
  if (id) {
    try {
      const response = await SubjectStudent(id);
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  }
}

export async function addSubject(ctx: Context) {
  const name = ctx.request.body.name;
  const classid = ctx.request.body.classid;
  const subjectid = ctx.request.body.subjectid;

  // console.log(name,classid,subjectid);
  if (
    name &&
    classid &&
    subjectid &&
    typeof name == "string" &&
    typeof classid == "string" &&
    typeof subjectid == "string"
  ) {
    try {
      const response = await AddSubject(name, classid, subjectid);
      ctx.response.status = 201;
      ctx.body = { Message: "data added successfully" };
    } catch (e) {
      ctx.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.response.status = 404;
    ctx.body = { Message: "Not correct parameters" };
  }
}

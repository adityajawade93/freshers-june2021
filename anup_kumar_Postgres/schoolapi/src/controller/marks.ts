import { Context } from "vm";
import {
  all_marks as allmarks,
  add_marks as addmarks,
  topper as topper1,
  all_marks,
} from "../services/marks";

export async function get_marks(ctx: Context) {
  try {
    const response = await all_marks();
    ctx.body = response.rows;
    ctx.response.status = 200;
    return;
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
}

export async function add_marks(ctx: Context) {
  const studentid = ctx.request.body.studentid;
  const subjectid = ctx.request.body.subjectid;
  const marks = ctx.request.body.marks;

  if (studentid && subjectid && typeof marks == "number") {
    try {
      const response = await addmarks(studentid, subjectid, marks);
      ctx.body = { Message: "data added succesfully" };
      ctx.response.status = 201;
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.response.status = 404;
    ctx.body = { message: "Invalid data entered" };
  }
}

export async function topper(ctx: Context) {
  var num = parseInt(ctx.params.num);

  if (typeof num === "number") {
    try {
      const response = await topper1(num);
      ctx.body = response.rows;
      ctx.response.status = 200;
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.response.status = 404;
    ctx.body = { message: "enter valid number" };
  }
  return;
}

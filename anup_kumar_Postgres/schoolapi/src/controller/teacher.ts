
import { Allteacher, TeacherStudent, AddTeacher } from "../services/teachers";
import { Context } from "vm";

export async function all_teachers(ctx: Context) {
  try {
    const response = await Allteacher();
    ctx.response.status = 200;
    ctx.body = response.rows;
    return;
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
    console.log(e);
  }
}

export async function student_of_teacher(ctx: Context) {
  const id = ctx.params.id;
  if (id) {
    try {
      const response = await TeacherStudent(id);
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    } catch (e) {
      ctx.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.body = { Message: "Enter the Valid id" };
    ctx.response.status = 404;
    return;
  }
}

export async function add_teacher(ctx: Context) {
  const name = ctx.request.body.name;
  if (name && typeof name === "string") {
    try {
      const response = await AddTeacher(name);
      ctx.response.status = 200;
      ctx.body = { Message: "Data added succesfully" };
      return;
    } catch (e) {
      ctx.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.body = { Message: "Enter the correct name" };
    ctx.response.status = 404;
  }
}

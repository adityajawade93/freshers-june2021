import { ValidatePage } from "../helper/index";
import { Context } from "vm";
import { AllClasses, addClass, classStudent } from "../services/class";

export async function getClasses(ctx: Context) {
  try {
    const response = await AllClasses();
    ctx.body = response.rows;
    ctx.response.status = 200;
    return;
  } catch (e) {
    console.log(e.message);
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
}

export async function studentsOfClass(ctx: Context) {
  const id = ctx.params.id.trim();
  // console.log(id);
  if (id) {
    try {
      const [response, responseError] = await classStudent(id);
      ctx.body = response.rows;
      return;
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = e.message;
      // console.log(e);
      return;
    }
  } else {
    ctx.response.status = 404;
    return;
  }
}

export async function createClass(ctx: Context) {
  const name = ctx.request.body.name;
  // console.log(name);

  if (name && typeof name == "string") {
    try {
      const response = await addClass(name);
      ctx.response.status = 201;
      ctx.body = "data added succefully";
    } catch (e) {
      ctx.response.status = 404;
      ctx.body = e.message;
      console.log(e);
    }
  } else {
    ctx.body = "Please enter proper class name";
    ctx.response.status = 406;
    return;
  }
}

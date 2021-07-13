import { Context } from "vm";
import { all_classes as allclasses, add_class as addclass , student_of_class as studentofclass } from "../services/class";

export async function all_classes(ctx: Context) {
  try {
    const response = await allclasses();
    ctx.body = response.rows;
    ctx.response.status = 200;
    return;
  } catch (e) {
    console.log(e.message);
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
}

export async function student_of_class(ctx: Context) {
  const id = ctx.params.id.trim();
  // console.log(id);
  if (id) {
    try {
      const [response, responseError] = await studentofclass(id);
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

export async function add_class(ctx: Context) {
  const name = ctx.request.body.name;
  // console.log(name);

  if (name && typeof name == "string") {
    try {
      const response = await addclass(name);
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

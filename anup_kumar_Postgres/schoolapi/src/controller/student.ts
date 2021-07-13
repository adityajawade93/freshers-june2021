import { validate_page} from "../helper/index";
import { Context } from "vm";
import { all_students as allstudents, add_students as addstudents} from "../services/student";

export const all_students = async (ctx: Context) => {
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  // console.log(page,size);

  const isValid = validate_page(page, size);

  if (isValid.result === "valid") {
    let limit = size;
    let offset = page * size;
    try {
      const [response, responseError] = await allstudents(page, offset);
      ctx.response.status = 200;
      ctx.body = response.rows;
      return;
    } catch (e) {
      ctx.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.response.status = 400;
    ctx.body = "Invalid request";
    return;
  }
};

export async function add_students(ctx: Context) {
  const name = ctx.request.body.name;
  const classid = ctx.request.body.classid;

  if (name && classid) {
    try {
      const [response, responseError] = await addstudents(name, classid);
      ctx.body = { Message: "Data added succesfully" };
      ctx.response.status = 201;
    } catch (e) {
      ctx.status = 404;
      ctx.body = { error: e.message };
      console.log(e);
    }
  } else {
    ctx.response.status = 404;
    ctx.body = { Message: "Enter valid parameters" };
    return;
  }
}

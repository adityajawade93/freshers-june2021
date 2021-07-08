import { ValidatePage, ValidId } from "../helper/index";
import { Context } from "vm";
import { AddStudent, AllStudents } from "../services/student";

export const getStudents = async (ctx: Context) => {
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  // console.log(page,size);

  var isValid = ValidatePage(page, size);

  if (isValid.result === "valid") {
    let limit = size;
    let offset = page * size;
    try {
      const [response, responseError] = await AllStudents(page, offset);
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

export async function addStudents(ctx: Context) {
  const name = ctx.request.body.name;
  const classid = ctx.request.body.classid;

  if (name && ValidId(classid)) {
    try {
      const [response, responseError] = await AddStudent(name, classid);
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

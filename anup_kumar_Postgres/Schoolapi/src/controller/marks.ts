import { ValidatePage, ValidId } from "../helper/index";
import { Context } from "vm";
import { AllMarks, AddMarks, Topper } from "../services/marks";

export async function getMarks(ctx: Context) {
  try {
    const response = await AllMarks();
    ctx.body = response.rows;
    ctx.response.status = 200;
    return;
  } catch (e) {
    ctx.status = 404;
    ctx.body = { error: e.message };
  }
}

export async function addMarks(ctx: Context) {
  const studentid = ctx.request.body.studentid;
  const subjectid = ctx.request.body.subjectid;
  const marks = ctx.request.body.marks;

  if (
    ValidId(studentid) == true &&
    ValidId(subjectid) &&
    typeof marks == "number"
  ) {
    try {
      const response = await AddMarks(studentid, subjectid, marks);
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

async function topper(ctx: Context) {
  var num = parseInt(ctx.params.num);

  if (typeof num === "number") {
    try {
      const [response, responseError] = await Topper(num);
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
}

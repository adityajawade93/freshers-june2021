import { Context } from "vm";
import { classSchema } from "../validation/schema";

const classController = require("../services/class");

interface IClassInfo {
  classId: number;
  stId: number;
}

exports.getClassInfo = async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: IClassInfo }> = [];
    rows = await classController.get_classes();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong  ${err}`,
    };
  }
};

exports.addStudentInClass = async (ctx: Context) => {
  let req: IClassInfo = ctx.request.body;

  const reqData = await classSchema.validateAsync(req);
  if (reqData.error) {
    ctx.response.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await classController.add_student_to_class(req.classId, req.stId);

    ctx.response.status = 201;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in classes table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding class ${err}`,
    };
  }
};

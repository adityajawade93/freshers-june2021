import { Context } from "vm";
import { teacherSchema } from "../validation/schema";
const teacherController = require("../services/teacher");

interface ITeacherInfo {
  teacherId: number;
  teacher_fname: string;
  teacher_lname: string;
  gender: CharacterData;
}

exports.getTeacherData = async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: ITeacherInfo }> = [];
    rows = await teacherController.get_teacher();

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

exports.add_teacher_in_table = async (ctx: Context) => {
  let req: ITeacherInfo = ctx.request.body;

  const reqData = await teacherSchema.validateAsync(req);

  if (reqData.error) {
    ctx.response.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await teacherController.add_teacher(
      req.teacherId,
      req.teacher_fname,
      req.teacher_lname,
      req.gender
    );

    ctx.response.status = 201;
    ctx.response.type = "text/html";
    ctx.body = {
      msg: "data is inserted in teacher table",
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding teacher ${err}`,
    };
  }
};

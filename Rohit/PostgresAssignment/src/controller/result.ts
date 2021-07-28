import { Context } from "vm";
import { resultSchema } from "../validation/schema";
import { updateResultSchema } from "../validation/schema";
const resultController = require("../services/result");

interface IResultInfo {
  studentid: number;
  class_Id: number;
  subject_Id: number;
  marks: number;
}

interface IUpdateResult {
  studentid: number;
  subject_Id: number;
  marks: number;
}

exports.getResultData = async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: IResultInfo }> = [];
    rows = await resultController.get_result();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong ${err}`,
    };
  }
};

exports.add_reasultData_in_table = async (ctx: Context) => {
  let req: IResultInfo = ctx.request.body;

  const reqData = await resultSchema.validateAsync(req);
  if (reqData.error) {
    ctx.response.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await resultController.add_result(
      req.studentid,
      req.class_Id,
      req.subject_Id,
      req.marks
    );

    ctx.response.status = 201;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in result table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding result ${err}`,
    };
  }
};

exports.updateResult_by_studentId_and_subjectId = async (ctx: Context) => {
  let req: IUpdateResult = ctx.request.body;

  const reqData = await updateResultSchema.validateAsync(req);
  if (reqData.error) {
    ctx.response.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await resultController.update_result(
      req.studentid,
      req.subject_Id,
      req.marks
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "marks are updated in result table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong ${err}`,
    };
  }
};

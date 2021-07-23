import { Context } from "vm";
const Joi = require("joi");

const resultSchema = Joi.object().keys({
  studentid: Joi.number().required(),
  class_Id: Joi.number().required(),
  subject_Id: Joi.number().required(),
  marks: Joi.number().required(),
});

const updateSchema = Joi.object().keys({
  studentid: Joi.number().required(),
  subject_Id: Joi.number().required(),
  marks: Joi.number().required(),
});

const resultController = require("../services/result");

interface IResultInfo {
  studentid: number;
  class_Id: number;
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
      msg: `something went wrong in adding result ${err}`,
    };
  }
};

exports.add_reasultData_in_table = async (ctx: Context) => {
  try {
    let req: IResultInfo = ctx.request.body;
    const reqData = await resultSchema.validateAsync(req);
    if (reqData.error) {
      ctx.response.status = 422;
      ctx.body = reqData.error.details[0].message;
      return;
    }

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
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding student ${err}`,
    };
  }
};

exports.updateResult_by_studentId_and_subjectId = async (ctx: Context) => {
  try {
    let req: IResultInfo = ctx.request.body;
    let [rows]: Array<{ rows: any }> = [];

    const reqData = await updateSchema.validateAsync(req);
    if (reqData.error) {
      ctx.response.status = 422;
      ctx.body = reqData.error.details[0].message;
      return;
    }

    let flag = 0;
    rows = await resultController.check_subject(req.studentid);
    let length = await resultController.subject_length(req.studentid);
    for (let i = 0; i < length.rows[0].count; i++) {
      if (req.subject_Id === rows.rows[i].subjId) {
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "This subject is not opted by the student";
      return;
    }

    await resultController.update_result(
      req.studentid,
      req.subject_Id,
      req.marks
    );

    ctx.response.status = 200;
    ctx.response.type = "text/html";
    ctx.body = "marks are updated in result table";
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding student ${err}`,
    };
  }
};

import { Context } from "vm";
import { subjectSchema } from "../validation/schema";

const subjectController = require("../services/subject");

interface ISubjectInfo {
  subjectId: number;
  subject_name: string;
}

exports.getSubjectData = async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: ISubjectInfo }> = [];
    rows = await subjectController.get_subject();

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong  ${err}`,
    };
  }
};

exports.add_subject_in_table = async (ctx: Context) => {
  let req: ISubjectInfo = ctx.request.body;

  const reqData = await subjectSchema.validateAsync(req);
  if (reqData.error) {
    ctx.response.status = 422;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await subjectController.add_subject(req.subjectId, req.subject_name);

    ctx.response.status = 201;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in Subject table";
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding subject ${err}`,
    };
  }
};

import { Context } from "vm";

const topperController = require("../services/topper");

interface topper {
  studentId: number;
  name: string;
  marks: number;
}

exports.getTopper_by_classId_and_subjectId = async (ctx: Context) => {
  var classId: number = parseInt(ctx.params.classId);
  var subjectId: number = parseInt(ctx.params.subjectId);
  try {
    let [rows]: Array<{ rows: topper }> = [];
    rows = await topperController.get_topper_by_classId_and_subjectId(
      classId,
      subjectId
    );

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

exports.getTopTen_by_classId = async (ctx: Context) => {
  var classId = parseInt(ctx.params.classId);
  try {
    let [rows]: Array<{ rows: topper }> = [];
    rows = await topperController.get_topten_students(classId);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong ${err}`,
    };
  }
};

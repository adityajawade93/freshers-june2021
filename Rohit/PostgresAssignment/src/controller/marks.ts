import { Context } from "vm";

const marksController = require("../services/marks");

interface IMarksInfo {
  subjectId: number;
  subject_name: string;
  marks: number;
}

exports.getSubjectMarks_by_studentId = async (ctx: Context) => {
  var studentId: number = parseInt(ctx.params.studentId);
  if (studentId === undefined || typeof studentId !== "number") {
    ctx.response.status = 400;
    ctx.response.type = "text/html";
    ctx.body = "Bad Request";
    return;
  }
  try {
    let [rows]: Array<{ rows: IMarksInfo }> = [];
    rows = await marksController.get_subjectmarks_by_studentid(studentId);
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

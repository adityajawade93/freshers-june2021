import { Context } from "vm";

const marksController = require("../services/marks");

interface IMarksInfo {
  subjectId: number;
  subject_name: string;
  marks: number;
}

exports.getSubjectMarks_by_studentId = async (ctx: Context) => {
  var studentId: number = parseInt(ctx.params.studentId);
  try {
    let [rows]: Array<{ rows: IMarksInfo }> = [];
    rows = await marksController.get_subjectmarks_by_studentid(studentId);
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

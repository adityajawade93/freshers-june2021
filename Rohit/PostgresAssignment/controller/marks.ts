import { Context } from "vm";

const mrk = require('../sql/marks');

interface marksinfo {
    subject_id: number;
    subject_name: string;
    marks: number;
  }
  

exports.subjectMarks_by_subjectId = async (ctx: Context) => {
    try {
      var id: number = parseInt(ctx.url.substring(7));
      if (id === undefined || typeof id !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: marksinfo }> = [];
      rows = await mrk.get_subjectmarks_by_studentid(id);
      ctx.response.status = 200;
      ctx.response.type = "application/json";
      ctx.body = rows.rows;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
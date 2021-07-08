import { Context } from "vm";

const res = require('../sql/result');

interface resultinfo {
    result_id: number;
    studentid: number;
    clas_id: number;
    subjectid: number;
    marks: number;
  }

  
exports.resultData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: resultinfo }> = [];
      rows = await res.get_result();
  
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
  
  exports.add_reasultData_in_table = async (ctx: Context) => {
    try {
      let req: resultinfo = ctx.request.body;
      if (
        req.result_id === undefined ||
        req.studentid === undefined ||
        req.clas_id === undefined ||
        req.subjectid === undefined ||
        req.marks === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.result_id !== "number" ||
        typeof req.studentid !== "number" ||
        typeof req.clas_id !== "number" ||
        typeof req.subjectid !== "number" ||
        typeof req.marks !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await res.add_result(
        req.result_id,
        req.studentid,
        req.clas_id,
        req.subjectid,
        req.marks
      );
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in result table";
    } catch {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
  
  exports.updateResult_by_stId_and_sbjId = async (ctx: Context) => {
    try {
      let req: resultinfo = ctx.request.body;
      let [rows]: Array<{ rows: any }> = [];
      if (
        req.studentid === undefined ||
        req.subjectid === undefined ||
        req.marks === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.studentid !== "number" ||
        typeof req.subjectid !== "number" ||
        typeof req.marks !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let flag = 0;
      rows = await res.check_subject(req.studentid);
      let length = await res.subject_length(req.studentid);
      for (let i = 0; i < length.rows[0].count; i++) {
        if (req.subjectid === rows.rows[i].subj_id) {
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
  
      await res.update_result(req.studentid, req.subjectid, req.marks);
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "marks are updated in result table";
    } catch {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
  
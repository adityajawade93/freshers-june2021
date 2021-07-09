import { Context } from "vm";

const subjectController = require('../services/subject');

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
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };

  exports.add_subject_in_table = async (ctx: Context) => {
    try {
      let req: ISubjectInfo = ctx.request.body;
      if (
        req.subjectId === undefined ||
        req.subject_name === undefined ||
        typeof req.subjectId !== "number" ||
        typeof req.subject_name !== "string" ||
        req.subject_name.trim() === ""
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await subjectController.add_subject(req.subjectId, req.subject_name);
  
      ctx.response.status = 201;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in Subject table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
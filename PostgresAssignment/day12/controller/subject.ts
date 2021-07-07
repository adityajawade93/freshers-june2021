import { Context } from "vm";

const subj = require('../sql/subject');

interface subjectinfo {
    sub_id: number;
    sub_name: string;
  }

  exports.subjectData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: subjectinfo }> = [];
      rows = await subj.get_subject();
  
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
      let req: subjectinfo = ctx.request.body;
      if (
        req.sub_id === undefined ||
        req.sub_name === undefined ||
        typeof req.sub_id !== "number" ||
        typeof req.sub_name !== "string" ||
        req.sub_name.trim() === ""
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await subj.add_subject(req.sub_id, req.sub_name);
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in Subject table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
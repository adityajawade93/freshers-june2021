import { Context } from "vm";

const top = require('../sql/topper');

interface topper {
    s_id: number;
    s_name: string;
    marks: number;
  }
  
  exports.topper_by_clsId_and_subjId = async (ctx: Context) => {
    try {
      var c_id: number = parseInt(ctx.params.c_id);
      var sub_id: number = parseInt(ctx.params.sub_id);
      if (
        c_id === undefined ||
        typeof c_id !== "number" ||
        sub_id === undefined ||
        typeof sub_id !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: topper }> = [];
      rows = await top.get_topper_by_classid_and_subjectid(c_id, sub_id);
  
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
  
  exports.topten_by_clsId = async (ctx: Context) => {
    try {
      var c_id = parseInt(ctx.params.c_id);
      if (c_id === undefined || typeof c_id !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: topper }> = [];
      rows = await top.get_topten_students(c_id);
  
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
import { Context } from "vm";

const tch = require('../sql/teacher')

interface teacherinfo {
    t_id: number;
    t_fname: string;
    t_lname: string;
    gender: CharacterData;
  }

exports.teacherData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: teacherinfo }> = [];
      rows = await tch.get_teacher();
  
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
  
  exports.add_teacher_in_table = async (ctx: Context) => {
    try {
      let req: teacherinfo = ctx.request.body;
      if (
        req.t_id === undefined ||
        req.t_fname === undefined ||
        req.t_lname === undefined ||
        req.gender === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (req.t_fname.trim() === "" || req.t_lname.trim() === "") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.t_id !== "number" ||
        typeof req.t_fname !== "string" ||
        typeof req.t_lname !== "string" ||
        typeof req.gender !== "string"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await tch.add_teacher(req.t_id, req.t_fname, req.t_lname, req.gender);
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in teacher table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
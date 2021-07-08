import { Context } from "vm";

const sched = require('../sql/classSchedule')

interface class_scheduleinfo {
    classid: number;
    classno: number;
    subj_id: number;
    subj_name: string;
    tch_id: number;
    tch_fname: string;
  }

  exports.class_scheduleData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: class_scheduleinfo }> = [];
      rows = await sched.get_class_schedule();
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


  exports.add_class_schedule_in_table = async (ctx: Context) => {
    try {
      let req: class_scheduleinfo = ctx.request.body;
      if (
        req.classid === undefined ||
        req.classno === undefined ||
        req.subj_id === undefined ||
        req.subj_name === undefined ||
        req.tch_id === undefined ||
        req.tch_fname === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.classid !== "number" ||
        typeof req.classno !== "number" ||
        typeof req.subj_id !== "number" ||
        typeof req.subj_name !== "string" ||
        typeof req.tch_id !== "number" ||
        typeof req.tch_fname !== "string"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (req.subj_name.trim() === "" || req.tch_fname.trim() === "") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await sched.add_class_schedule(
        req.classid,
        req.classno,
        req.subj_id,
        req.subj_name,
        req.tch_id,
        req.tch_fname
      );
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in Class_schedule table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
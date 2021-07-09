import { Context } from "vm";

const scheduleController = require('../services/classSchedule')

interface IClassScheduleInfo {
    cls_Id: number;
    classno: number;
    subjId: number;
    subject_name: string;
    teach_Id: number;
    teacher_fname: string;
  }

  exports.getClass_scheduleData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: IClassScheduleInfo }> = [];
      rows = await scheduleController.get_class_schedule();
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
      let req: IClassScheduleInfo = ctx.request.body;
      if (
        req.cls_Id === undefined ||
        req.classno === undefined ||
        req.subjId === undefined ||
        req.subject_name === undefined ||
        req.teach_Id === undefined ||
        req.teacher_fname === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.cls_Id !== "number" ||
        typeof req.classno !== "number" ||
        typeof req.subjId !== "number" ||
        typeof req.subject_name !== "string" ||
        typeof req.teach_Id !== "number" ||
        typeof req.teacher_fname !== "string"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (req.subject_name.trim() === "" || req.teacher_fname.trim() === "") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await scheduleController.add_class_schedule(
        req.cls_Id,
        req.classno,
        req.subjId,
        req.subject_name,
        req.teach_Id,
        req.teacher_fname
      );
  
      ctx.response.status = 201;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in Class_schedule table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
import { Context } from "vm";

const Joi = require("joi");

const scheduleSchema = Joi.object().keys({
  cls_Id: Joi.number().required(),
  classno: Joi.number().required(),
  subjId: Joi.number().required(),
  subject_name: Joi.string().trim().required(),
  teach_Id: Joi.number().required(),
  teacher_fname: Joi.string().trim().required(),
});

const scheduleController = require("../services/classSchedule");

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
    await scheduleSchema.validateAsync(req);

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

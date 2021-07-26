import { Context } from "vm";
import { scheduleSchema } from "../validation/schema";

const scheduleController = require("../services/classSchedule");

interface IClassScheduleInfo {
  cls_Id: number;
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
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong ${err}`,
    };
  }
};

exports.add_class_schedule_in_table = async (ctx: Context) => {
  let req: IClassScheduleInfo = ctx.request.body;

  const reqData = await scheduleSchema.validateAsync(req);

  if (reqData.error) {
    ctx.response.status = 400;
    ctx.body = reqData.error.details[0].message;
    return;
  }
  try {
    await scheduleController.add_class_schedule(
      req.cls_Id,
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
    ctx.response.type = "application/json";
    ctx.body = {
      msg: `something went wrong in adding classSchedule ${err}`,
    };
  }
};

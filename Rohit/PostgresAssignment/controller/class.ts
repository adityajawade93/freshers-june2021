import { Context } from "vm";

const classController = require('../services/class');

interface IClassInfo {
    classId: number;
    stId: number;
  }
  
  
exports.getClassInfo = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: IClassInfo }> = [];
      rows = await classController.get_classes();
  
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
  
  exports.addStudentInClass = async (ctx: Context) => {
    try {
      let req: IClassInfo = ctx.request.body;
      if (
        req.classId === undefined ||
        req.stId === undefined ||
        typeof req.classId !== "number" ||
        typeof req.stId !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await classController.add_student_to_class(req.classId, req.stId);
  
      ctx.response.status = 201;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in classes table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
  
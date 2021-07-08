import { Context } from "vm";

const cls = require('../sql/class');

interface classesinfo {
    cls_id: number;
    st_id: number;
  }
  
  
exports.classData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: classesinfo }> = [];
      rows = await cls.get_classes();
  
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
  
  exports.add_student_in_classes_table = async (ctx: Context) => {
    try {
      let req: classesinfo = ctx.request.body;
      if (
        req.cls_id === undefined ||
        req.st_id === undefined ||
        typeof req.cls_id !== "number" ||
        typeof req.st_id !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await cls.add_student_in_class(req.cls_id, req.st_id);
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in classes table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
  
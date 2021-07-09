import { Context } from "vm";

const topperController = require('../services/topper');

interface topper {
    studentId: number;
    name: string;
    marks: number;
  }
  
  exports.getTopper_by_classId_and_subjectId = async (ctx: Context) => {
    try {
      var classId: number = parseInt(ctx.params.classId);
      var subjectId: number = parseInt(ctx.params.subjectId);
      if (
        classId=== undefined ||
        typeof classId !== "number" ||
        subjectId === undefined ||
        typeof subjectId !== "number"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: topper }> = [];
      rows = await topperController.get_topper_by_classId_and_subjectId(classId, subjectId);
  
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
  
  exports.getTopTen_by_classId = async (ctx: Context) => {
    try {
      var classId = parseInt(ctx.params.classId);
      if (classId === undefined || typeof classId !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: topper }> = [];
      rows = await topperController.get_topten_students(classId);
  
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
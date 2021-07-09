import { Context } from "vm";

const teacherController = require('../services/teacher')

interface ITeacherInfo {
    teacherId: number;
    teacher_fname: string;
    teacher_lname: string;
    gender: CharacterData;
  }

exports.getTeacherData = async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: ITeacherInfo }> = [];
      rows = await teacherController.get_teacher();
  
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
      let req: ITeacherInfo = ctx.request.body;
      if (
        req.teacherId === undefined ||
        req.teacher_fname === undefined ||
        req.teacher_lname === undefined ||
        req.gender === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (req.teacher_fname.trim() === "" || req.teacher_lname.trim() === "") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.teacherId !== "number" ||
        typeof req.teacher_fname !== "string" ||
        typeof req.teacher_lname !== "string" ||
        typeof req.gender !== "string"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      await teacherController.add_teacher(req.teacherId, req.teacher_fname, req.teacher_lname, req.gender);
  
      ctx.response.status = 201;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in teacher table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };
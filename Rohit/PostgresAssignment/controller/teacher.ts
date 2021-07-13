import { Context } from "vm";

const Joi = require('joi');
const teacherSchema = Joi.object().keys({
  teacherId: Joi.number().required(),
  teacher_fname: Joi.string().trim().required(),
  teacher_lname: Joi.string().trim().required(),
  gender: Joi.string().required()
});

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
      await teacherSchema.validateAsync(req);

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
import { Context } from "vm";

const std = require('../sql/student');

interface studentinfo {
    s_id: number,
    s_name: string,
    dob: Date,
    gender: CharacterData
  }

  
interface student_details {
    student_id: number;
    fname: string;
  }



  exports.studentData =  async (ctx: Context) => {
    try {
      let [rows]: Array<{ rows: studentinfo }> = [];
      rows = await std.get_student();
  
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

  exports.studentData_by_classId = async (ctx: Context) => {
    try {
      var id: number = parseInt(ctx.params.id);
      if (id === undefined || typeof id !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: student_details }> = [];
      rows = await std.get_student_by_classid(id);
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
  
  exports.studentData_teacherId = async (ctx: Context) => {
    try {
      var id: number = parseInt(ctx.url.substring(9));
      if (id === undefined || typeof id !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: student_details }> = [];
      rows = await std.get_student_by_teacherid(id);
  
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
  
  exports.studentData_subjectId = async (ctx: Context) => {
    try {
      var id: number = parseInt(ctx.url.substring(9));
      if (id === undefined || typeof id !== "number") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
      let [rows]: Array<{ rows: student_details }> = [];
      rows = await std.get_student_by_subjectid(id);
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
  

  exports.add_student_in_table = async (ctx: Context) => {
    try {
      let req: studentinfo = ctx.request.body;
      if (
        req.s_id === undefined ||
        req.s_name === undefined ||
        req.dob === undefined ||
        req.gender === undefined
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (req.s_name.trim() === "") {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      if (
        typeof req.s_id !== "number" ||
        typeof req.s_name !== "string" ||
        typeof req.dob !== "string" ||
        typeof req.gender !== "string"
      ) {
        ctx.response.status = 400;
        ctx.response.type = "text/html";
        ctx.body = "Bad Request";
        return;
      }
  
      await std.add_student(req.s_id, req.s_name, req.dob, req.gender);
  
      ctx.response.status = 200;
      ctx.response.type = "text/html";
      ctx.body = "data is inserted in students table";
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.type = "text/html";
      ctx.body = "internal server error";
      return;
    }
  };


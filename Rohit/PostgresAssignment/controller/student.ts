import { Context } from "vm";

const studentController = require("../services/student");

interface IStudentInfo {
  studentId: number;
  name: string;
  dob: Date;
  gender: CharacterData;
  slice(a: number, b: number): IStudentInfo;
}

interface IStudentDetails {
  studentId: number,
  name: string,
  dob:Date,
  gender:CharacterData
}

exports.getStudentData = async (ctx: Context) => {
  try {
    let [rows]: Array<{ rows: IStudentInfo }> = [];
    let length: any;

    rows = await studentController.get_student();
    length = await studentController.get_student_length();

    const page = parseInt(ctx.request.query.page);
    const size = parseInt(ctx.request.query.size);
    const totalPages = Math.ceil(length.rows[0].count / size);
    if (
      page === undefined ||
      size === undefined ||
      typeof page !== "number" ||
      typeof size !== "number"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    if (page < 0 || size < 0 || page > totalPages) {
      ctx.response.status = 404;
      ctx.response.type = "text/html";
      ctx.body = "Not Found";
      return;
    }

    const startid = page * size;
    const endid = Math.min((page + 1) * size, length.rows[0].count);
    let data = rows.rows;
    data = (data).slice(startid, endid);

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
    var classId: number = parseInt(ctx.params.classId);
    if (classId === undefined || typeof classId !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: IStudentDetails }> = [];
    rows = await studentController.get_student_by_classid(classId);
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
    var teacherId: number = parseInt(ctx.params.teacherId);
    if (teacherId === undefined || typeof teacherId !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: IStudentDetails }> = [];
    rows = await studentController.get_student_by_teacherid(teacherId);

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
    var subjectId: number = parseInt(ctx.params.subjectId);
    if (subjectId === undefined || typeof subjectId !== "number") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }
    let [rows]: Array<{ rows: IStudentDetails }> = [];
    rows = await studentController.get_student_by_subjectid(subjectId);
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
    let req: IStudentInfo = ctx.request.body;
    if (
      req.studentId === undefined ||
      req.name === undefined ||
      req.dob === undefined ||
      req.gender === undefined
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (req.name.trim() === "") {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    if (
      typeof req.studentId !== "number" ||
      typeof req.name !== "string" ||
      typeof req.dob !== "string" ||
      typeof req.gender !== "string"
    ) {
      ctx.response.status = 400;
      ctx.response.type = "text/html";
      ctx.body = "Bad Request";
      return;
    }

    await studentController.add_student(
      req.studentId,
      req.name,
      req.dob,
      req.gender
    );

    ctx.response.status = 201;
    ctx.response.type = "text/html";
    ctx.body = "data is inserted in students table";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "internal server error";
    return;
  }
};

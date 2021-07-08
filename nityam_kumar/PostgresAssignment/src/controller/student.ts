import uuid from "uniqid";
import { Context } from "vm";
import * as studentService from "../services/student";
import { invalidData, serverERROR, NOTFOUNDERROR } from "../utils/util";
// import { checkStudent } from "../helper/validation";
import studentSchema from "../config/db/validateSchema/studentSchema";
import AppError from "../utils/appError";
import Joi from "joi";

const studentIDSchema = Joi.object({
  student_id: Joi.string().trim().required(),
});

interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

export const createStudent = async (ctx: Context) => {
  try {
    const s1: IStudent = ctx.request.body;
    await studentSchema.validateAsync(s1);
    s1.student_id = uuid();
    const msg = await studentService.addStudentDB(s1);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created student with ${s1.student_id}`,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const modifyStudent = async (ctx: Context) => {
  try {
    const student_id = ctx.params.studentID;

    await studentIDSchema.validateAsync({ student_id: student_id });

    await studentService.checkExists(student_id);

    const { fname, lname, age, class_number } = ctx.request.body;

    await studentService.modifyStudentDB(
      fname,
      lname,
      age,
      class_number,
      student_id
    );

    ctx.status = 200;
    ctx.body = {
      status: `successfully updated student with ${student_id}`,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const getStudents = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      invalidData(ctx, "Bad Input");
      return;
    }

    page = Number(page);
    size = Number(size);

    let student_table_size: number = await studentService.countStudents();
    const max_page_limit: number = Math.ceil(student_table_size / size);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      throw new AppError("Page NOT FOUND!!", 404);
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, student_table_size);
    const req_size = end_index - start_index;

    const result = await studentService.getStudentsDB(start_index, req_size);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      total_student: student_table_size,
      data: result,
    };
  } catch (err) {
    throw err;
  }
};

export const getStudentSchedule = async (ctx: Context) => {
  try {
    const student_id = ctx.params.studentID;
    await studentIDSchema.validateAsync({ student_id: student_id });
    const result = await studentService.getStudentScheduleDB(student_id);
    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: result,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

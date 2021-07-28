/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import uuid from "uniqid";
import { Context } from "vm";
import * as studentService from "../services/student";

import studentSchema from "../db/validateSchema/studentSchema";
import paginationSchema from "../db/validateSchema/paginationSchema";

import AppError from "../utils/appError";
import {
  studentIDSchema,
  studentModifySchema,
} from "../db/validateSchema/helperSchema";

interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
  dob: Date;
}

export const createStudent = async (ctx: Context) => {
  const s1: IStudent = ctx.request.body;

  try {
    await studentSchema.validateAsync(s1);
  } catch (err) {
    throw new AppError(err.message, 400);
  }

  s1.student_id = uuid();
  await studentService.addStudent(s1);
  ctx.status = 200;
  ctx.body = {
    status: `successfully created student with ${s1.student_id}`,
  };
};

export const modifyStudent = async (ctx: Context) => {
  const student_id = ctx.params.studentID;
  const { fname, lname, age, class_number, dob } = ctx.request.body;

  try {
    await studentModifySchema.validateAsync({
      fname,
      lname,
      age,
      class_number,
      student_id,
      dob,
    });
  } catch (err) {
    throw new AppError(err.message, 400);
  }

  const data = await studentService.checkExists(student_id);
  if (data === 0) {
    throw new AppError(`student with this id not found`, 404);
  }
  await studentService.modifyStudent(
    fname,
    lname,
    age,
    class_number,
    student_id,
    dob
  );

  ctx.status = 200;
  ctx.body = {
    status: `successfully updated student with ${student_id}`,
  };
};

export const getStudents = async (ctx: Context) => {
  let page = ctx.query.page;
  let size = ctx.query.size;

  try {
    await paginationSchema.validateAsync({ page, size });
  } catch (err) {
    throw new AppError(err.message, 400);
  }

  page = Number(page);
  size = Number(size);

  const student_table_size: number = await studentService.countStudents();
  const max_page_limit: number = Math.ceil(student_table_size / size);
  

  if (page > max_page_limit) {
    throw new AppError("Page NOT FOUND!!", 404);
  }

  const start_index = (page - 1) * size;
  const end_index = Math.min(page * size, student_table_size);
  const req_size = end_index - start_index;

  const result = await studentService.getStudents(start_index, req_size);

  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    total_student: student_table_size,
    data: result,
  };
};

export const getStudentSchedule = async (ctx: Context) => {
  const student_id = ctx.params.studentID;

  try {
    await studentIDSchema.validateAsync({ student_id: student_id });
  } catch (err) {
    throw new AppError(err.message, 400);
  }

  const result = await studentService.getStudentSchedule(student_id);
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: result,
  };
};

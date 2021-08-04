/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import uuid from "uniqid";
import { Context } from "vm";
import * as studentService from "../services/student";

import studentSchema from "../db/validateSchema/studentSchema";
import paginationSchema from "../db/validateSchema/paginationSchema";

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

  const { error } = studentSchema.validate(s1);

  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  s1.student_id = uuid();
  await studentService.addStudent(s1);
  ctx.status = 201;
  ctx.body = {
    status: `successfully created student with ${s1.student_id}`,
    student_id: s1.student_id,
  };
};

export const modifyStudent = async (ctx: Context) => {
  const student_id = ctx.params.studentID;
  const { fname, lname, age, class_number, dob } = ctx.request.body;

  const { error } = studentModifySchema.validate({
    fname,
    lname,
    age,
    class_number,
    student_id,
    dob,
  });

  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const data = await studentService.checkExists(student_id);
  if (data === 0) {
    ctx.status = 404;
    ctx.body = {
      status: `student with ${student_id} does not exist`,
    };
    return;
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

  const { error } = paginationSchema.validate({ page, size });

  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  page = Number(page);
  size = Number(size);

  const student_table_size: number = await studentService.countStudents();
  const max_page_limit: number = Math.ceil(student_table_size / size);

  if (page > max_page_limit) {
    ctx.status = 404;
    ctx.body = {
      status: "Page NOT FOUND!!",
    };
    return;
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

  const { error } = studentIDSchema.validate({
    student_id: student_id,
  });

  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const result = await studentService.getStudentSchedule(student_id);
  if (result.length === 0) {
    ctx.status = 404;
    ctx.body = "student id not found";
    return;
  }

  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: result,
  };
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import uuid from "uniqid";
import { Context } from "vm";
import * as teacherService from "../services/teacher";
import {
  teacherIDSchema,
  teacherModifySchema,
} from "../db/validateSchema/helperSchema";
import teacherSchema from "../db/validateSchema/teacherSchema";
import paginationSchema from "../db/validateSchema/paginationSchema";

interface ITeacher {
  age: number;
  fname: string;
  lname: string;
  teacher_id?: string;
  sex?: string;
  dob: Date;
}

export const createTeacher = async (ctx: Context) => {
  const t1: ITeacher = ctx.request.body;

  const { error } = teacherSchema.validate(t1);
  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  t1.teacher_id = uuid();
  await teacherService.addTeacher(t1);
  ctx.status = 201;
  ctx.body = {
    status: `successfully created teacher with ${t1.teacher_id}`,
    teacher_id: t1.teacher_id,
  };
};

export const modifyTeacher = async (ctx: Context) => {
  const teacher_id = ctx.params.teacherId;
  const { fname, lname, age, dob } = ctx.request.body;

  const { error } = teacherModifySchema.validate({
    fname,
    lname,
    age,
    teacher_id,
    dob,
  });
  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const data = await teacherService.checkExists(teacher_id);
  if (data === 0) {
    ctx.status = 404;
    ctx.body = {
      status: `teacher with ${teacher_id} does not exist`,
    };
    return;
  }
  await teacherService.modifyTeacher(fname, lname, age, teacher_id, dob);

  ctx.status = 200;
  ctx.body = {
    status: `successfully updated teacher with ${teacher_id}`,
  };
};

export const getTeachers = async (ctx: Context) => {
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

  const teacher_table_size: number = await teacherService.countTeachers();
  const max_page_limit = Math.ceil(teacher_table_size / size);

  if (page > max_page_limit) {
    ctx.status = 404;
    ctx.body = {
      status: "NOT FOUND",
    };
    return;
  }

  const start_index = (page - 1) * size;
  const end_index = Math.min(page * size, teacher_table_size);
  const req_size = end_index - start_index;
  const data = await teacherService.getTeachers(start_index, req_size);

  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    total_teachers: teacher_table_size,
    data: data,
  };
};

export const getTeachersTeaching = async (ctx: Context) => {
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

  const teacher_table_size: number =
    await teacherService.countTeachersTeaching();

  const max_page_limit = Math.ceil(teacher_table_size / size);

  if (page > max_page_limit) {
    ctx.status = 404;
    ctx.body = {
      status: "NOT FOUND!!",
    };
    return;
  }

  const start_index = (page - 1) * size;
  const end_index = Math.min(page * size, teacher_table_size);
  const req_size = end_index - start_index;

  const data = await teacherService.getTeachersTeaching(start_index, req_size);

  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    total: teacher_table_size,
    data: data,
  };
};

export const fetchStudentsWithTeacher = async (ctx: Context) => {
  const teacher_id = ctx.params.teacherId;

  const { error } = teacherIDSchema.validate({ teacher_id });
  if (error) {
    ctx.status = 400;
    ctx.body = error.message;
    return;
  }

  const data = await teacherService.fetchStudentWithTeacherID(teacher_id);
  if (data.length === 0) {
    ctx.status = 404;
    ctx.body = {
      status: "ID NOT FOUND",
    };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    status: `successfull`,
    data: data,
  };
};

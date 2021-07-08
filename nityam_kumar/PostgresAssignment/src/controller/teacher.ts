import uuid from "uniqid";
import { Context } from "vm";
import * as teacherService from "../services/teacher";

import teacherSchema from "../config/db/validateSchema/teacherSchema";
import AppError from "../utils/appError";

interface ITeacher {
  age: number;
  fname: string;
  lname: string;
  teacher_id?: string;
  sex?: string;
}

export const createTeacher = async (ctx: Context) => {
  try {
    const t1: ITeacher = ctx.request.body;

    await teacherSchema.validateAsync(t1);

    t1.teacher_id = uuid();

    await teacherService.addTeacherDB(t1);
    ctx.status = 200;
    ctx.body = {
      status: `successfully created teacher with ${t1.teacher_id}`,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const modifyTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacherId;
    if (!teacher_id || typeof teacher_id !== "string") {
      throw new AppError("BAD DATA", 400);
    }

    await teacherService.checkExists(teacher_id);

    const { fname, lname, age } = ctx.request.body;

    await teacherService.modifyTeacherDB(fname, lname, age, teacher_id);

    ctx.status = 200;
    ctx.body = {
      status: `successfully updated teacher with ${teacher_id}`,
    };
  } catch (err) {
    throw err;
  }
};

export const getTeachers = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      throw new AppError("BAD DATA", 400);
    }

    page = Number(page);
    size = Number(size);

    let teacher_table_size: number = await teacherService.countTeachers();
    const max_page_limit = Math.ceil(teacher_table_size / size);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      throw new AppError("NOT FOUND!!", 404);
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, teacher_table_size);
    const req_size = end_index - start_index;
    const data = await teacherService.getTeachersDB(start_index, req_size);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      total_teachers: teacher_table_size,
      data: data,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const getTeachersTeaching = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      throw new AppError("BAD DATA", 400);
    }

    page = Number(page);
    size = Number(size);

    let teacher_table_size: number =
      await teacherService.countTeachersTeaching();

    const max_page_limit = Math.ceil(teacher_table_size / size);

    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      throw new AppError("NOT FOUND!!", 404);
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, teacher_table_size);
    const req_size = end_index - start_index;

    const data = await teacherService.getTeachersTeachingDB(
      start_index,
      req_size
    );

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      total: teacher_table_size,
      data: data,
    };
  } catch (err) {
    if (!err.status) throw new AppError(err.message, 400);
    throw err;
  }
};

export const fetchStudentsWithTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacherId;
    if (!teacher_id || typeof teacher_id !== "string") {
      throw new AppError("BAD DATA", 400);
    }

    const data = await teacherService.fetchStudentWithTeacherID(teacher_id);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

import uuid from "uniqid";
import { Context } from "vm";
import * as teacherService from "../services/teacher";
import { invalidData, serverERROR, NOTFOUNDERROR } from "../utils/util";
// import { checkTeacher } from "../helper/validation";
import teacherSchema from "../config/db/validateSchema/teacherSchema";

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
    // if (!checkTeacher(t1)) {
    //   invalidData(ctx, "Bad input Data");
    //   return;
    // }

    await teacherSchema.validateAsync(t1);

    t1.teacher_id = uuid();

    if (await teacherService.addTeacherDB(t1)) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully created teacher with ${t1.teacher_id}`,
      };
    } else {
      invalidData(ctx, "Bad input Data");
    }
  } catch (err) {
    serverERROR(ctx);
  }
};

export const modifyTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacherId;
    if (!teacher_id || typeof teacher_id !== "string") {
      invalidData(ctx, "Bad input Data");
      return;
    }

    if (!(await teacherService.checkExists(teacher_id))) {
      invalidData(ctx, `teacher with this id not found`);
      return;
    }
    const { fname, lname, age } = ctx.request.body;

    const queryResult = await teacherService.modifyTeacherDB(
      fname,
      lname,
      age,
      teacher_id
    );
    if (queryResult) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully updated teacher with ${teacher_id}`,
      };
    } else {
      invalidData(ctx, "Bad input Data");
    }
  } catch (err) {
    serverERROR(ctx);
  }
};

export const getTeachers = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      ctx.status = 400;
      ctx.body = {
        status: `Bad input`,
      };
      return;
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
      NOTFOUNDERROR(ctx, "NOT FOUND!!");
      return;
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
    serverERROR(ctx);
  }
};

export const getTeachersTeaching = async (ctx: Context) => {
  try {
    let page = ctx.query.page;
    let size = ctx.query.size;

    if (!page || !size || isNaN(page) || isNaN(size)) {
      invalidData(ctx, "Bad input Data");
      return;
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
      NOTFOUNDERROR(ctx, "NOT FOUND!!");
      return;
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
    serverERROR(ctx);
  }
};

export const fetchStudentsWithTeacher = async (ctx: Context) => {
  try {
    const teacher_id = ctx.params.teacherId;
    if (!teacher_id || typeof teacher_id !== "string") {
      invalidData(ctx, "Bad input Data");
      return;
    }

    const data = await teacherService.fetchStudentWithTeacherID(teacher_id);

    if (data.length === 0) {
      NOTFOUNDERROR(ctx, `id not found`);
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      data: data,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

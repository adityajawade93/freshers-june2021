import uuid from "uniqid";
import { Context } from "vm";
import * as studentWorker from "../services/student";
import { invalidData, serverERROR, NOTFOUNDERROR } from "../config/error";
import { checkStudent } from "../config/validation";

interface Student {
  cl_no: number;
  age: number;
  st_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}



export const createStudent = async (ctx: Context) => {
  try {
    const s1: Student = ctx.request.body;
    if (!checkStudent(s1)) {
      invalidData(ctx, "bad input");
      return;
    }
    s1.st_id = uuid();
    const msg = await studentWorker.addStudentDB(s1);

    if (msg) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully created student with ${s1.st_id}`,
      };
    } else {
      invalidData(ctx, "bad Input");
    }
  } catch (err) {
    serverERROR(ctx);
  }
};

export const modifyStudent = async (ctx: Context) => {
  try {
    const st_id = ctx.params.st_id;
    if (!st_id || typeof st_id !== "string") {
      invalidData(ctx, "Bad Input");
      return;
    }

    if (!(await studentWorker.checkExists(st_id))) {
      invalidData(ctx, `student with this id not found`);
      return;
    }

    const { fname, lname, age, cl_no } = ctx.request.body;

    const queryResult = await studentWorker.modifyStudentDB(
      fname,
      lname,
      age,
      cl_no,
      st_id
    );
    if (queryResult) {
      ctx.status = 200;
      ctx.body = {
        status: `successfully updated student with ${st_id}`,
      };
    } else {
      invalidData(ctx, "Bad Input");
    }
  } catch (err) {
    serverERROR(ctx);
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

    let student_table_size: number = await studentWorker.countStudents();
    const max_page_limit: number = Math.ceil(student_table_size / size);
    const max_size_limit = 500;

    if (
      page <= 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      NOTFOUNDERROR(ctx, "Page NOT FOUND!!");
      return;
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, student_table_size);
    const req_size = end_index - start_index;

    const result = await studentWorker.getStudentsDB(start_index, req_size);

    ctx.status = 200;
    ctx.body = {
      status: `successfull`,
      total_student: student_table_size,
      data: result,
    };
  } catch (err) {
    serverERROR(ctx);
  }
};

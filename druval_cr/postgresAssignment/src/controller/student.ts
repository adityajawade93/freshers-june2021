/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';

import { getGenderNotation } from '../helper/general';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as studentService from '../services/student';
import studentSchema from '../database/helper/validateSchema/studentSchema';

interface PersonRequestI {
  name?: any;
  sex?: any;
  age?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addStudent(ctx: Context) {
  try {
    const requestData: PersonRequestI = ctx.request.body;
    await studentSchema.validateAsync(requestData);
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex ? getGenderNotation(requestData.sex) : null;
    const age: number | null = requestData.age ? requestData.age : null;

    await studentService.addStudent(id, name, sex, age);
    ctx.body = {
      message: `student with id: ${id} created`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getStudents(ctx: Context) {
  try {
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalStudent: number = await studentService.countStudents();

    const boundary: PaginationBoundaryI = { offset: 0, limit: totalStudent };

    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalStudent);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }
    const allStudents = await studentService.getStudents(boundary.offset, boundary.limit);

    ctx.body = {
      total_students: totalStudent,
      data: allStudents,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getStudentMarks(ctx: Context) {
  try {
    const student_id: string = ctx.params.student_id;
    const studentMarks = await studentService.getStudentMarks(student_id);

    ctx.body = {
      count: studentMarks.length,
      data: studentMarks,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

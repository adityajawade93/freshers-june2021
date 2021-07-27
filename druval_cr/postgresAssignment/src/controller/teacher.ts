/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';

import { getGenderNotation } from '../helper/general';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as teacherService from '../services/teacher';
import teacherSchema from '../database/helper/validateSchema/teacherSchema';

interface PersonRequestI {
  name?: any;
  sex?: any;
  age?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addTeacher(ctx: Context) {
  try {
    const requestData: PersonRequestI = ctx.request.body;
    await teacherSchema.validateAsync(requestData);
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex ? getGenderNotation(requestData.sex) : null;
    const age: number | null = requestData.age ? requestData.age : null;

    await teacherService.addTeacher(id, name, sex, age);
    ctx.body = {
      message: `teacher with id: ${id} created`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getTeachers(ctx: Context) {
  try {
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalTeacher: number = await teacherService.countTeachers();

    const boundary: PaginationBoundaryI = { offset: 0, limit: totalTeacher };

    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalTeacher);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }
    const allTeachers = await teacherService.getTeachers(boundary.offset, boundary.limit);

    ctx.body = {
      total_teachers: totalTeacher,
      data: allTeachers,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getTeacherStudents(ctx: Context) {
  try {
    const teacher_id: string = ctx.params.teacher_id;
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await teacherService.getTeacherStudents(teacher_id, { action: 'count' });

    const boundary: PaginationBoundaryI = { offset: 0, limit: totalEntry };

    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalEntry);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }
    const students = await teacherService.getTeacherStudents(teacher_id, { action: 'details', payload: boundary });

    ctx.body = {
      total_students: totalEntry,
      data: students,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

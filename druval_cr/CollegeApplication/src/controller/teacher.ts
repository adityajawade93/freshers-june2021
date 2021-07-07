/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';

import { validPersonRequestData } from '../helper/validation';
import { getGenderNotation } from '../helper/general';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as teacherService from '../services/teacher';

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
  const requestData: PersonRequestI = ctx.request.body;
  const validRequestData: boolean = validPersonRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex ? getGenderNotation(requestData.sex) : null;
    const age: number = requestData.age ? requestData.age : null;

    const result: boolean = await teacherService.addTeacher(id, name, sex, age);
    if (result) {
      ctx.body = {
        message: `teacher with id: ${id} created`,
      };
    } else {
      ctx.status = 400;
      ctx.body = 'invalid data';
    }
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getTeachers(ctx: Context) {
  try {
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalTeacher: number = await teacherService.countTeachers();

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalTeacher,
    };
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
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getTeacherStudents(ctx: Context) {
  try {
    const teacher_id: string = ctx.params.teacher_id;
    if (!uuidValidate(teacher_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validTeacher: boolean = await checkExistByUniqueKeys('teacher', ['id'], [teacher_id]);
    if (!validTeacher) {
      ctx.status = 400;
      ctx.body = 'invalid teacher id';
      return;
    }

    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await teacherService.getTeacherStudents(teacher_id, { action: 'count' });
    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalEntry,
    };
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
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

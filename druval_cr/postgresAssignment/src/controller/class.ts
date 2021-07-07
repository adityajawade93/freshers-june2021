/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';

import { validClassRequestData } from '../helper/validation';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as classService from '../services/class';

interface ClassRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addClass(ctx: Context) {
  const requestData: ClassRequestI = ctx.request.body;
  const validRequestData: boolean = validClassRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('class', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }
    const result: boolean = await classService.addClass(id, name);
    if (result) {
      ctx.body = {
        message: `class with id: ${id} created`,
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

export async function getClasses(ctx: Context) {
  try {
    const allClasses = await classService.getClasses();

    ctx.body = {
      count: allClasses.length,
      data: allClasses,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getClassStudents(ctx: Context) {
  try {
    const class_id: string = ctx.params.class_id;
    if (!uuidValidate(class_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validClass: boolean = await checkExistByUniqueKeys('class', ['id'], [class_id]);
    if (!validClass) {
      ctx.status = 400;
      ctx.body = 'invalid class id';
      return;
    }
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await classService.getClassStudents(class_id, { action: 'count' });

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalEntry,
    };
    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalEntry);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }
    const students = await classService.getClassStudents(class_id, { action: 'details', payload: boundary });

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

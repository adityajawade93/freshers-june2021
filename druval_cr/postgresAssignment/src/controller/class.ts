/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';

import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as classService from '../services/class';
import classSchema from '../database/helper/validateSchema/classSchema';

interface ClassRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addClass(ctx: Context) {
  try {
    const requestData: ClassRequestI = ctx.request.body;
    await classSchema.validateAsync(requestData);
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase().trim();

    await classService.addClass(id, name);

    ctx.body = {
      message: `class with ${id} is added`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
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
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getClassStudents(ctx: Context) {
  try {
    const class_id: string = ctx.params.class_id;
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await classService.getClassStudents(class_id, { action: 'count' });

    const boundary: PaginationBoundaryI = { offset: 0, limit: totalEntry };

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
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

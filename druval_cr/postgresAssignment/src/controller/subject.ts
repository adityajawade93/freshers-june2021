/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';

import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as subjectService from '../services/subject';
import subjectSchema from '../database/helper/validateSchema/subjectSchema';

interface SubjectRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addSubject(ctx: Context) {
  try {
    const requestData: SubjectRequestI = ctx.request.body;
    await subjectSchema.validateAsync(requestData);
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    await subjectService.addSubject(id, name);

    ctx.body = {
      message: `subject with ${id} is added`,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.isJoi) ctx.status = 422;
    else if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getSubjects(ctx: Context) {
  try {
    const allSubjects = await subjectService.getSubjects();

    ctx.body = {
      count: allSubjects.length,
      data: allSubjects,
    };
  } catch (e) {
    ctx.status = 404;
    if (e.status) ctx.status = e.status;

    ctx.body = { error: e.message };
  }
}

export async function getSubjectStudents(ctx: Context) {
  try {
    const subject_id: string = ctx.params.subject_id;
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await subjectService.getSubjectStudents(subject_id, { action: 'count' });

    const boundary: PaginationBoundaryI = { offset: 0, limit: totalEntry };

    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalEntry);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }
    const students = await subjectService.getSubjectStudents(subject_id, { action: 'details', payload: boundary });

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

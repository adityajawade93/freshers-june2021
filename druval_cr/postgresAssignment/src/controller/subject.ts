/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'vm';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';

import { validSubjectRequestData } from '../helper/validation';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import * as subjectService from '../services/subject';

interface SubjectRequestI {
  name?: any;
}

interface PaginationBoundaryI {
  offset: number;
  limit: number;
}

export async function addSubject(ctx: Context) {
  const requestData: SubjectRequestI = ctx.request.body;
  const validRequestData: boolean = validSubjectRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    const id: string = uuidv4();
    const name: string = requestData.name.toLowerCase();

    const duplicate: boolean = await checkExistByUniqueKeys('subject', ['name'], [name]);
    if (duplicate) {
      ctx.status = 400;
      ctx.body = 'duplicate data';
      return;
    }

    const result: boolean = await subjectService.addSubject(id, name);
    if (result) {
      ctx.body = {
        message: `subject with id: ${id} created`,
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

export async function getSubjects(ctx: Context) {
  try {
    const allSubjects = await subjectService.getSubjects();

    ctx.body = {
      count: allSubjects.length,
      data: allSubjects,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getSubjectStudents(ctx: Context) {
  try {
    const subject_id: string = ctx.params.subject_id;
    if (!uuidValidate(subject_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validSubject: boolean = await checkExistByUniqueKeys('subject', ['id'], [subject_id]);
    if (!validSubject) {
      ctx.status = 400;
      ctx.body = 'invalid subject id';
      return;
    }

    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalEntry: number = await subjectService.getSubjectStudents(subject_id, { action: 'count' });

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalEntry,
    };
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
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

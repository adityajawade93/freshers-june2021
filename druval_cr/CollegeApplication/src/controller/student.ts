/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Context } from 'vm';
import uuidValidate from 'uuid-validate';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'pg';

import { query as dbQuery, setPath as dbSetPath } from '../database/index';
import checkExistByUniqueKeys from '../database/helper/checkExistByUniqueKeys';
import { getGenderNotation } from '../helper/general';
import { validQueryParams as validPaginationParams, pagenation } from '../helper/pagination';
import { validPersonRequestData } from '../helper/validation';

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
  const requestData: PersonRequestI = ctx.request.body;
  const validRequestData: boolean = validPersonRequestData(requestData) && requestData.name;
  if (!validRequestData) {
    ctx.status = 400;
    ctx.body = 'invalid data';
    return;
  }
  try {
    await dbSetPath();
    const id: string = uuidv4();
    const name: string = requestData.name.trim();
    const sex: string | null = requestData.sex ? getGenderNotation(requestData.sex) : null;
    const age: number | null = requestData.age ? requestData.age : null;

    const query = 'insert into student (id, name, sex, age) values ($1, $2, $3, $4)';
    const result: QueryResult<any> = await dbQuery(query, [id, name, sex, age]);
    if (result && result.command === 'INSERT') {
      ctx.body = {
        message: `student with id: ${id} created`,
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

export async function getStudents(ctx: Context) {
  try {
    await dbSetPath();
    const paramsData: { page: number; size: number } = validPaginationParams(ctx.request.query);
    const totalStudentQuery: QueryResult<any> = await dbQuery('select count(*) as total from student');
    const totalStudent = totalStudentQuery.rows[0].total;

    const boundary: PaginationBoundaryI = {
      offset: 0,
      limit: totalStudent,
    };
    if (paramsData.page !== -1 && paramsData.size !== -1) {
      const paginationResult: PaginationBoundaryI = pagenation(paramsData.page, paramsData.size, totalStudent);
      boundary.offset = paginationResult.offset;
      boundary.limit = paginationResult.limit;
    }

    const allStudentsQuery: QueryResult<any> = await dbQuery('select * from student offset $1 limit $2', [
      boundary.offset,
      boundary.limit,
    ]);
    const allStudents = allStudentsQuery.rows;

    ctx.body = {
      total_students: totalStudent,
      data: allStudents,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

export async function getStudentMarks(ctx: Context) {
  try {
    await dbSetPath();
    const student_id: string = ctx.params.student_id;
    if (!uuidValidate(student_id)) {
      ctx.status = 400;
      ctx.body = 'invalid uuid';
      return;
    }

    const validStudent: boolean = await checkExistByUniqueKeys('student', ['id'], [student_id]);
    if (!validStudent) {
      ctx.status = 400;
      ctx.body = 'invalid student id';
      return;
    }

    const query = `
      select subject.name as subject, mark.marks
      from mark
      inner join student on student.id = mark.student_id
      inner join subject on subject.id = mark.subject_id
      where mark.student_id = $1
    `;
    const result: QueryResult<any> = await dbQuery(query, [student_id]);
    const studentMarks = result.rows;

    ctx.body = {
      count: studentMarks.length,
      data: studentMarks,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      message: 'server error',
      error: e,
    };
  }
}

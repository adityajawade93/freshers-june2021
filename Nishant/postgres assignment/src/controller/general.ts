import { Context } from 'vm';

import { QueryResult } from 'pg';
import * as servicegeneral from '../services/general';
import * as validategeneral from '../helper/generalvalidation';

export async function gettopperByclassIdAndSubjectId(ctx: Context) {
  let { classId, subjectId }:{classId:number, subjectId:number} = ctx.params;
  classId = Number(classId);
  subjectId = Number(subjectId);
  const data = [classId, subjectId];
  const reqBody = await validategeneral.gettopperByclassIdAndSubjectIdSchema.validateAsync(data);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    const rows:QueryResult = await servicegeneral.gettopperByclassIdAndSubjectId(classId,
      subjectId);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function gettopstudent(ctx: Context) {
  let { classId, count }:{classId:number, count:number} = ctx.params;
  classId = Number(classId);
  count = Number(count);
  const data = [classId, count];
  const reqBody = await validategeneral.getTopStudentSchema.validateAsync(data);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    const rows:QueryResult = await servicegeneral.gettopstudent(classId, count);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

import { Context } from 'vm';

import { QueryResult } from 'pg';
import * as servicegeneral from '../services/general';
import * as validategeneral from '../helper/generalvalidation';

export async function gettopperByclassIdAndSubjectId(ctx: Context) {
  try {
    let { classId, subjectId }:{classId:number, subjectId:number} = ctx.params;
    classId = Number(classId);
    subjectId = Number(subjectId);
    const data = [classId, subjectId];
    await validategeneral.gettopperByclassIdAndSubjectIdSchema.validateAsync(data);

    const rows:QueryResult = await servicegeneral.gettopperByclassIdAndSubjectIdService(classId,
      subjectId);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    if (e.isJoi === true) {
      ctx.response.status = 422;
      ctx.response.type = 'text/html';
      ctx.body = 'unprocessable entity';
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = 'internal server error';
    }
  }
}

export async function gettopstudent(ctx: Context) {
  try {
    let { classId, count }:{classId:number, count:number} = ctx.params;
    classId = Number(classId);
    count = Number(count);
    if (classId === undefined || typeof count !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    const rows:QueryResult = await servicegeneral.gettopstudentService(classId, count);

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = rows.rows;
  } catch (e) {
    if (e.isJoi === true) {
      ctx.response.status = 422;
      ctx.response.type = 'text/html';
      ctx.body = 'unprocessable entity';
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = 'internal server error';
    }
  }
}

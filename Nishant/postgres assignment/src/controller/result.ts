import { Context } from 'vm';

import * as serviceresult from '../services/result';
import * as validation from '../helper/resultvalidation';

interface IResult{
    result_id:number;
    studentid:number;
    clas_id:number;
    subjectid:number;
    marks:number;
}

interface IResultUpdate{
  studentid:number;
  subjectid:number;
  marks:number;
}

export async function addResult(ctx: Context) {
  const req:IResult = ctx.request.body;
  const reqBody = validation.addResultSchema.validate(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    await serviceresult.addResult(req.result_id, req.studentid, req.clas_id,
      req.subjectid, req.marks);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in result table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function updateResult(ctx: Context) {
  const req:IResultUpdate = ctx.request.body;
  let [rows]: Array<{rows: any}> = [];
  let flag = 0;
  const reqBody = validation.updateResultSchema.validate(req);
  if (reqBody.error) {
    ctx.response.status = 400;
    ctx.response.type = 'text/html';
    ctx.body = 'Bad Request';
    return;
  }
  try {
    rows = await serviceresult.checkSubject(req.studentid);
    const length = await serviceresult.subjectLength(req.studentid);
    for (let i = 0; i < length.rows[0].count; i++) {
      if (req.subjectid === rows.rows[i].subj_id) {
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'This subject is not opted by the student';
      return;
    }

    await serviceresult.updateResult(req.studentid, req.subjectid, req.marks);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'marks are updated in result table';
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

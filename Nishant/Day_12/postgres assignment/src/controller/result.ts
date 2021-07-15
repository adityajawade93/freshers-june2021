/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Context } from 'vm';

import Joi from 'joi';
import * as serviceresult from '../services/result';

const schema = Joi.object().keys({
  studentid: Joi.number().required(),
  subjectid: Joi.number().required(),
  marks: Joi.number().required(),
});

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
  try {
    const req:IResult = ctx.request.body;
    if (req.result_id === undefined || req.studentid === undefined || req.clas_id === undefined || req.subjectid === undefined || req.marks === undefined) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }

    if (typeof req.result_id !== 'number' || typeof req.studentid !== 'number' || typeof req.clas_id !== 'number' || typeof req.subjectid !== 'number' || typeof req.marks !== 'number') {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
      return;
    }
    await serviceresult.addResultService(req.result_id, req.studentid, req.clas_id, req.subjectid, req.marks);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'data is inserted in result table';
  } catch {
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = 'internal server error';
  }
}

export async function updateResult(ctx: Context) {
  try {
    const req:IResultUpdate = ctx.request.body;
    let [rows]: Array<{rows: any}> = [];
    await schema.validateAsync(req);

    let flag = 0;
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

    await serviceresult.updateResultService(req.studentid, req.subjectid, req.marks);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = 'marks are updated in result table';
  } catch (e) {
    if (e.isJoi === true) {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = 'Bad Request';
    } else {
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = 'internal server error';
    }
  }
}

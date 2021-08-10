import { Context } from 'vm';
import * as marksService from '../service/marks.service';

export async function getMarksByStudentId(ctx: Context){
  const studentId = ctx.params.id;
  try{
    const response = await marksService.getMarksByStudentId(studentId);
    ctx.response.status = 200;
    ctx.body = response;
    return;
  }
  catch(error){
    ctx.response.status = error.status;
    ctx.body = error.message;
    return;
  }
};

export async function highestMarksBySubject(ctx: Context){
  const subjetId = ctx.params.id;
  try{
    const response = await marksService.highestMarksBySubject(subjetId);
    ctx.response.status = 200;
    ctx.body = response;
    return;
  }
  catch(error){
    ctx.response.status = error.status;
    ctx.body = error.message;
    return;
  }
};

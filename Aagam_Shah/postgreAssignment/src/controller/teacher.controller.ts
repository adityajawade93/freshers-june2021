import { Context } from 'vm';
import * as teacherService from '../service/teacher.service';

export async function listAllTeachers(ctx: Context){
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  try{
    const response = await teacherService.listAllTeachers(page, size);
    ctx.response.status = 200;
    ctx.body = response;
    return;
  }
  catch(e){
    ctx.response.status = e.status;
    ctx.body = e.message;
    return;
  }
};

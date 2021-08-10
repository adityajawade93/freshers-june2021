import { Context } from 'vm';
import * as subjectService from '../service/subject.service';

export async function listAllSubjects(ctx: Context){
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  try{
    const response = await subjectService.listAllSubjects(page, size);
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

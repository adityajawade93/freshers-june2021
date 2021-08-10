import { Context } from 'vm';
import * as classService from '../service/class.service';

export async function listAllClasses(ctx: Context) {
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  try{
    const response = await classService.getClasses(page, size);
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

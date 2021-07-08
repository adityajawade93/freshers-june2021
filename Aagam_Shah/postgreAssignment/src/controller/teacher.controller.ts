const db = require('../config/database').pool;
import { Context } from "vm";
import * as validation from '../helper/validation';

exports.listAllTeachers = async (ctx: Context) => {
  var page = parseInt(ctx.request.query.page);
  var size = parseInt(ctx.request.query.size);
  var isValid = validation.page_validation(page,size);
  if(isValid.message === "true"){
    let limit = size;
    let offset = page*size;
    const response = await db.query(
      'SELECT * FROM school.teacher LIMIT $1 OFFSET $2', [limit,offset]
    );
    ctx.response.status = 200;
    ctx.body = response.rows;
    return;
  }
  else{
    ctx.response.status = isValid.status;
    ctx.body = isValid.message;
    return;
  }
};

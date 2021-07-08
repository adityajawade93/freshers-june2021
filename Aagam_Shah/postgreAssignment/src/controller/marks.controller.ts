const db = require('../config/database').pool;
import { Context } from "vm";
import * as validation from '../helper/validation';

exports.marksOfStudent = async (ctx: Context) => {
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
        `select * from school.marks where studentid = $1`, [id]
      );
      if(response.rows.length){
        ctx.response.status = 200;
        ctx.body = response.rows;
        return;
      }
      ctx.response.status = 400;
      ctx.body = "Required Id is not Present";
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = "invalid id passed";
    ctx.response.status = 400;
    return;
  }
};

exports.highestMarkOfSubject = async (ctx: Context) => {
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
        `select * from school.marks 
        where subjectid = $1
        order by marks desc
        limit 1`, [id]
      );
      if(response.rows.length){
        ctx.response.status = 200;
        ctx.body = response.rows;
        return;
      }
      ctx.response.status = 400;
      ctx.body = "Required Id is not Present";
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = "invalid id passed";
    ctx.response.status = 400;
    return;
  }
};

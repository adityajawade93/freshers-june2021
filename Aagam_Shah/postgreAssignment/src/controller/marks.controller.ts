// const db = require('../config/database').pool;
import db from '../config/database';
import { Context } from 'vm';
import * as validation from '../helper/validation';

export async function marksOfStudent(ctx: Context){
  const studentId = ctx.params.id;
  if(validation.isValidId(studentId)){
    try{
      const response = await db.query(
        `select * from school.marks where studentid = $1`, [studentId]
      );
      if(response.rows.length){
        ctx.response.status = 200;
        ctx.body = response.rows;
        return;
      }
      ctx.response.status = 400;
      ctx.body = 'Required Id is not Present';
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = 'invalid id passed';
    ctx.response.status = 400;
    return;
  }
};

export async function highestMarkOfSubject(ctx: Context){
  const subjetId = ctx.params.id;
  if(validation.isValidId(subjetId)){
    try{
      const response = await db.query(
        `select * from school.marks 
        where subjectid = $1
        order by marks desc
        limit 1`, [subjetId]
      );
      if(response.rows.length){
        ctx.response.status = 200;
        ctx.body = response.rows;
        return;
      }
      ctx.response.status = 400;
      ctx.body = 'Required Id is not Present';
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = 'invalid id passed';
    ctx.response.status = 400;
    return;
  }
};

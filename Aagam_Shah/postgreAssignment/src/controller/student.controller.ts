const db = require('../config/database').pool;
import { Context } from "vm";
import * as validation from '../helper/validation';

exports.getById = async (ctx: Context) => {
  var table = ctx.params.table;
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
      `SELECT * FROM school.${table} where ${table}id = $1`, [id]
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

exports.listAllStudents = async (ctx: Context) => {
  var page = parseInt(ctx.request.query.page);
  var size = parseInt(ctx.request.query.size);
  var isValid = validation.page_validation(page,size);

  if(isValid.message === "true"){
    let limit = size;
    let offset = page*size;
    const response = await db.query(
      'SELECT * FROM school.student LIMIT $1 OFFSET $2', [limit,offset]
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

exports.studentOfClass = async (ctx: Context) => {
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
        'select * from school.student where classid = $1', [id]
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

exports.studentOfTeacher = async (ctx: Context) => {
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.teacherid =  $1`, [id]
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

exports.studentOfSubject = async (ctx: Context) => {
  var id = ctx.params.id;
  if(validation.isValidId(id)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.subjectid = $1`, [id]
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

exports.topStudents = async (ctx: Context) => {
  var number = parseInt(ctx.params.number);
  if(typeof number === "number"){
    try{
      const response = await db.query(
        `select studentid, sum(marks) as total 
        from school.marks 
        group by studentid 
        order by total desc 
        limit $1`, [number]
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
    ctx.body = "invalid number passed";
    ctx.response.status = 400;
    return;
  }
};

exports.createStudent = async (ctx: Context) => {
  var name = ctx.request.body.name.trim();
  var classid = ctx.request.body.classid.trim();
  if(!name || !classid){
      ctx.body = "Data should not be empty";
      ctx.response.status = 406;
      return;
  }
  if(validation.isValidId(classid)){
    try{
      const response = await db.query(
        `INSERT INTO school.student(name, classid) 
        VALUES ($1 , $2);`, [name, classid]
      );
      // console.log(response.rowCount); // 1
      if(response.rowCount){
        ctx.response.status = 201;
        ctx.body = "Student added successfully";
        return;
      }
      ctx.response.status = 500;
      ctx.body = "Oops... Server Error !!!";
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = "Invalid class id";
    ctx.response.status = 406;
    return;
  }
}
// const db = require('../config/database').pool;
import db from '../config/database';
import { Context } from 'vm';
import * as validation from '../helper/validation';

// export async function getById(ctx: Context){
//   const table = ctx.params.table;
//   const id = ctx.params.id;
//   if(validation.isValidId(id)){
//     try{
//       const response = await db.query(
//       `SELECT * FROM school.${table} where ${table}id = $1`, [id]
//       );
//       if(response.rows.length){
//         ctx.response.status = 200;
//         ctx.body = response.rows;
//         return;
//       }
//       ctx.response.status = 400;
//       ctx.body = 'Required Id is not Present';
//       return;
//     }
//     catch(error){
//       ctx.response.status = 500;
//       ctx.body = error.message;
//       return;
//     }
//   }
//   else{
//     ctx.body = 'invalid id passed';
//     ctx.response.status = 400;
//     return;
//   }
// };

export async function listAllStudents(ctx: Context){
  const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  const isValid = validation.page_validation(page,size);

  if(isValid.message === 'true'){
    const limit = size;
    const offset = page*size;
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

export async function listStudentOfClass(ctx: Context){
  const classId = ctx.params.id;
  if(validation.isValidId(classId)){
    try{
      const response = await db.query(
        'select * from school.student where classid = $1', [classId]
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

export async function listStudentOfTeacher(ctx: Context){
  const teacherId = ctx.params.id;
  if(validation.isValidId(teacherId)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.teacherid =  $1`, [teacherId]
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

export async function listStudentOfSubject(ctx: Context){
  const subjectIid = ctx.params.id;
  if(validation.isValidId(subjectIid)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.subjectid = $1`, [subjectIid]
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

export async function topStudents(ctx: Context){
  const num = parseInt(ctx.params.number);
  if(typeof num === 'number'){
    try{
      const response = await db.query(
        `select studentid, sum(marks) as total 
        from school.marks 
        group by studentid 
        order by total desc 
        limit $1`, [num]
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
    ctx.body = 'invalid number passed';
    ctx.response.status = 400;
    return;
  }
};

export async function createStudent(ctx: Context){
  const name = ctx.request.body.name.trim();
  const classid = ctx.request.body.classid.trim();
  if(!name || !classid){
      ctx.body = 'Data should not be empty';
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
        ctx.body = 'Student added successfully';
        return;
      }
      ctx.response.status = 500;
      ctx.body = 'Oops... Server Error !!!';
      return;
    }
    catch(error){
      ctx.response.status = 500;
      ctx.body = error.message;
      return;
    }
  }
  else{
    ctx.body = 'Invalid class id';
    ctx.response.status = 406;
    return;
  }
}
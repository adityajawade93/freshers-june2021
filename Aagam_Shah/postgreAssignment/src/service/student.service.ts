// const db = require('../config/database').pool;
import db from '../config/database';
import * as validation from '../helper/validation';
import { CError } from '../helper/customError';

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

export async function listAllStudents(page: number, size: number){
  try{
    // if(!page || !size){
    //   page = 0;
    //   size = 5;
    // }
    const isValid = validation.page_validation(page,size);
    if(isValid.message === 'true'){
      const limit = size;
      const offset = page*size;
      const response = await db.query(
        'SELECT * FROM school.student LIMIT $1 OFFSET $2', [limit,offset]
      );
      return response.rows;
    }
    else{
      throw new CError(isValid.message, isValid.status);
    }
  }
  catch (e) {
    throw new CError(e.message, e.status);
  }
};

export async function listStudentOfClass(classId: string){  
  if(validation.isValidId(classId)){
    try{
      const response = await db.query(
        'select * from school.student where classid = $1', [classId]
      );
      if(response.rows.length){
        return response.rows;
      }
      throw new CError('Required Id is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid id passed', 400);
  }
};

export async function listStudentByTeacherId(teacherId: string){
  if(validation.isValidId(teacherId)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.teacherid =  $1`, [teacherId]
      );
      if(response.rows.length){
        return response.rows;
      }
      throw new CError('Required Id is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid id passed', 400);
  }
};

export async function listStudentOfSubject(subjectIid: string){
  if(validation.isValidId(subjectIid)){
    try{
      const response = await db.query(
        `select * 
        from school.student as st, school.subject as sb
        where st.classid = sb.classid and sb.subjectid = $1`, [subjectIid]
      );
      if(response.rows.length){
        return response.rows;
      }
      throw new CError('Required Id is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid id passed', 400);
  }
};

export async function topStudents(num: number){
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
        return response.rows;
      }
      throw new CError('Required Data is not Present', 400);
    }
    catch(error){
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError('invalid number passed', 400);
  }
};

export async function createStudent(student: any){
  // if(!student){
  //     throw new CError('Data should not be empty', 406);
  // }
  const validationResponse = validation.validateStudent(student);
  if(!validationResponse.error){
    try{
      const response = await db.query(
        `INSERT INTO school.student(name, classid) 
        VALUES ($1 , $2);`, [student.name, student.classid]
      );
      // console.log(response.rowCount); // 1
      if(response.rowCount){
        return;
      }
      throw new CError('Oops... Server Error !!!', 500);
    }
    catch(error){
      if(error.message === 'insert or update on table "student" violates foreign key constraint "student_classid_fkey"'){
        throw new CError('Given class does not exists', error.status);
      }
      throw new CError(error.message, error.status);
    }
  }
  else{
    throw new CError(validationResponse.error.message, 406);
  }
}
import { Context } from 'vm';
import * as studentService from '../service/student.service';

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
  try{
    const response = await studentService.listAllStudents(page, size);
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

export async function listStudentOfClass(ctx: Context){
  const classId = ctx.params.id;
  try{
    const response = await studentService.listStudentOfClass(classId);
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

export async function listStudentByTeacherId(ctx: Context){
  const teacherId = ctx.params.id;
  try{
    const response = await studentService.listStudentByTeacherId(teacherId);
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

export async function listStudentOfSubject(ctx: Context){
  const subjectId = ctx.params.id;
  try{
    const response = await studentService.listStudentOfSubject(subjectId);
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

export async function topStudents(ctx: Context){
  const num = parseInt(ctx.params.number);
  try{
    const response = await studentService.topStudents(num);
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

export async function createStudent(ctx: Context){
  // const name = ctx.request.body.name.trim();
  // const classid = ctx.request.body.classid.trim();
  try{
    await studentService.createStudent(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = 'Student added successfully';
    return;
  }
  catch(e){
    ctx.response.status = e.status;
    ctx.body = e.message;
    return;
  }
}
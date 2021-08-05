import { Context } from "vm";

const {getStudentList,getStudentInfoByStudentId, addStudentToList, updateStudentToList } = require('../services/student');

interface student{
  student_id: number;
	student_name: string;
	student_dob: Date;
	student_address: object;
	student_gender: string;
	student_phone: string;
}

export async function getstudentList(ctx: Context){
  try{
    const studentList = await getStudentList();
    const page: number = parseInt(ctx.request.query.page);
    const limit: number = parseInt(ctx.request.query.size);

    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    let results: object = {};

    try {
      results = await studentList.slice(startIndex, endIndex);
      ctx.response.type = 'application/json';
      ctx.response.status = 200;
      ctx.response.body = JSON.stringify(results);
    } catch (e) {
      ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.response.body = 'data not fetched';
    }
  }
  catch (err){
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.response.body = 'data not fetched from studentList';
  }
};

export async function getstudentInfoByStudentId(ctx: Context){
  try{
    const studentId:number = ctx.request.params.studentId;
    const studentInfo:student = getStudentInfoByStudentId(studentId);
    if(typeof studentInfo.student_id!=='number' || typeof studentInfo.student_name!=='string' || studentInfo.student_name.trim()===""|| typeof studentInfo.student_gender!=='string' || typeof studentInfo.student_phone!=='string'|| typeof studentInfo.student_address!=='object'  ){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "The Request is not valid"; 
      return ;
    }
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = studentInfo; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get student information"; 
      return ;
    }
}

export async function addstudentToList(ctx: Context){
  try{
    const studentInfo:student = ctx.request.body;
    const res = addStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = "Student inserted into students table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add student to students table"; 
      return ;
    }
}

export async function updatestudentToList(ctx: Context){
  try{
    const studentInfo:student = ctx.request.body;
    const res = updateStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = "Student updated in students table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not update student in students table"; 
      return ;
    }
}

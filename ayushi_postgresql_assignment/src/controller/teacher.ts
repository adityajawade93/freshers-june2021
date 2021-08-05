import { Context } from "vm";

const {getTeacherList,addTeacherToList, updateTeacherInList} = require('../services/teacher');

interface teacher{
  teacher_id: number;
	teacher_name: string;
	teacher_dob: Date;
	teacher_address: object;
	teacher_gender: string;
	teacher_phone: string;
}

export async function getteacherList(ctx: Context){
  try {
    const teacherList = await getTeacherList();
    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(teacherList);
  } catch (e) {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.response.body = 'data not fetched';
  }
};

export async function addteacherToList(ctx: Context){
  try{
    const teacherInfo:teacher = ctx.request.body;
    const res = addTeacherToList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Teacher inserted into teachers table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add teacher to teachers table"; 
      return ;
    }
}

export async function updateTeacherToList(ctx: Context){
  try{
    const teacherInfo:teacher = ctx.request.body;
    const res = updateTeacherInList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Teacher inserted into teachers table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add teacher to teachers table"; 
      return ;
    }
}


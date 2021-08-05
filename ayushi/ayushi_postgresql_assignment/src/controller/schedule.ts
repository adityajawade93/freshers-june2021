import { Context } from "vm";

const {addSchedule, classByTeacher, studentByClass, classBySubject} = require('../services/schedule');
const {getStudentListByStudentId} = require('../services/student');

interface schedule {
  class_id:number;
  subject_id: number;
	teacher_id: number;
}

interface student{
  student_id: number;
	student_name: string;
	student_dob: Date;
	student_address: object;
	student_gender: string;
	student_phone: string;
}

export async function addschedule(ctx: Context){
  try{
    const scheduleInfo:schedule = ctx.request.body;
    const res = addSchedule(scheduleInfo.class_id,scheduleInfo.subject_id,scheduleInfo.teacher_id);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Entry successful into schedule table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add entry to schedule table"; 
      return ;
    }
}

export async function studentsbyClass(ctx: Context){
  try{
    const classId:number = ctx.request.params.classId;
    const res:number[] = studentByClass(classId);
    const result:student[] = getStudentListByStudentId(res);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(result); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get student by classid"; 
      return ;
    }
}

export async function studentsByTeacher(ctx: Context){
  try{
    const teacherId:number = ctx.request.params.teacherId;
    const classId:number = classByTeacher(teacherId);
    const studentId:number[] = studentByClass(classId);
    const result:student[] = getStudentListByStudentId(studentId);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(result); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get student by teacher"; 
      return ;
    }
}

export async function studentsBySubject(ctx: Context){
  try{
    const subjectId:number = ctx.request.body;
    const classId:number = classBySubject(subjectId);
    const studentId:number[] = studentByClass(classId);
    const result:student[] = getStudentListByStudentId(studentId);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(result); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get student by teacher"; 
      return ;
    }
}

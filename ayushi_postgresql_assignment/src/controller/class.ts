import { Context } from "vm";

const {getClassList,addStudentToClassList, getStudentsByClass} = require('../services/class');

interface student_class{
  student_id: number;
	class_id: number;
}

export async function getclassList(ctx: Context){
  try {
    const classList = await getClassList();
    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(classList);
  } catch (e) {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.response.body = 'data not fetched';
  }
};

export async function addstudentToClassList(ctx: Context){
  try{
    const classInfo:student_class = ctx.request.body;
    const res = addStudentToClassList(classInfo.student_id,classInfo.class_id);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Student inserted into student_class table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add student to student_class table"; 
      return ;
    }
}

export async function getstudentsByClass(ctx: Context){
  try {
    const classId:number = ctx.request.params.classId;
    const classList = await getStudentsByClass(classId);
    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(classList);
  } catch (e) {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.response.body = 'data not fetched';
  }
};

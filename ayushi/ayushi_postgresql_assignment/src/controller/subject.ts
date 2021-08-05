import { Context } from "vm";

const {getSubjectList,addSubjectToList, updateSubjectInList} = require('../services/subject');

interface subject{
  subject_id: number;
	subject_name: string;
}

export async function getsubjectList(ctx: Context){
  try {
    const subjectList = await getSubjectList();
    ctx.response.type = 'application/json';
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify(subjectList);
  } catch (e) {
    ctx.response.type = 'text/html';
    ctx.response.status = 500;
    ctx.response.body = 'data not fetched';
  }
};

export async function addsubjectToList(ctx: Context){
  try{
    const subjectInfo:subject = ctx.request.body;
    const res = addSubjectToList(subjectInfo.subject_id,subjectInfo.subject_name);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Subject inserted into subjects table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not add subject to subjects table"; 
      return ;
    }
}

export async function updateSubjectToList(ctx: Context){
  try{
    const subjectInfo:subject = ctx.request.body;
    const res = updateSubjectInList(subjectInfo.subject_id,subjectInfo.subject_name);
    // var passengerRequest = new studentInfoBody(studentInfo.student_id,studentInfo.student_name,studentInfo.student_address,studentInfo.student_dob,studentInfo.student_gender,studentInfo.student_phone);
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = res + "Subject updated in subjects table"; 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not update subject in subjects table"; 
      return ;
    }
}


import { Context } from "vm";
const resultValidation = require('../validation/result_validation');

const {subjectMarksByStudent, topStudentWithSubject, topScoreStudents} = require('../services/result.ts');
const {getStudentInfoByStudentId} = require('../services/student');

interface results {
  student_id:number;
  class_id?:number;
  subject_id: number;
	marks: number;
}

interface subjectmarks {
  subject_id: number;
	marks: number;
}

interface student{
  student_id: number;
	student_name: string;
	student_dob: Date;
	student_address: object;
	student_gender: string;
	student_phone: string;
}

interface studentmarks {
  student_info:student;
  subject_id?:number;
  marks:number;
}

class studentMarksBody implements studentmarks {

  student_info:student;
  subject_id?:number;
  marks:number;

  constructor(student_info:student,marks:number, subject_id?:number) {
    this.student_info = student_info;
    this.subject_id = subject_id;
    this.marks = marks;
  }
}

export async function subjectmarksByStudent(ctx: Context){
  const studentId:number = ctx.request.params.studentId;
  try{
      const value = await resultValidation.subjectmarksByStudentSchema.validate({student_id: studentId});
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const subjectMarksInfo:subjectmarks = await subjectMarksByStudent(studentId);
    console.log(subjectMarksInfo);
    if(subjectMarksInfo == undefined){
      throw new Error('No student exists with given student ID.')
    }
    ctx.response.status = 200;
    ctx.body = {
      data: subjectMarksInfo
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not get subject marks by student. ${err.message}`
      }
      return ;
    }
}

export async function topstudentWithSubject(ctx: Context){
  const classId:number = ctx.request.params.classId;
  try{
      const value = await resultValidation.topstudentWithSubjectSchema.validate({class_id: classId});
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res:results[] = await topStudentWithSubject(classId);
    if(res.length == 0){
      throw new Error('Given class ID does not exist.');
    }
    let result:studentMarksBody[] = [];

    for(let i=0;i<res.length;i++) {
      let studentId = res[i].student_id;
      let student:student = await getStudentInfoByStudentId(studentId);
      let studentInfo = new studentMarksBody(student, res[i].subject_id, res[i].marks);
      result.push(studentInfo);
    }
    
    ctx.response.status = 200;
    ctx.body = {
      data: result
    } 
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
      error: `Could not get top student with subjectid: ${err.message}`
    } 
      return ;
    }
}

export async function topscoreStudents(ctx: Context){
  try{
    const topStudents:results[] = await topScoreStudents();
    console.log(topStudents);
    let result:studentMarksBody[] = [];

    for(let i=0;i<topStudents.length;i++) {
      let studentId = topStudents[i].student_id;
      let student:student = await getStudentInfoByStudentId(studentId);
      let studentInfo = new studentMarksBody(student,topStudents[i].marks);
      result.push(studentInfo);
    }
    console.log(result);
    ctx.response.status = 200;
    ctx.body = {
      data: result
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not get top students. ${err.message}`
      }
      return ;
    }
}

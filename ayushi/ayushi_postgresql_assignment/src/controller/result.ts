import { Context } from "vm";

const {subjectMarksByStudent, topStudentWithSubject, topScoreStudents} = require('../services/result');
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
  subject_id:number;
  marks:number;
}

class studentMarksBody implements studentmarks {

  student_info:student;
  subject_id:number;
  marks:number;

  constructor(student_info:student,subject_id:number,marks:number) {
    this.student_info = student_info;
    this.subject_id = subject_id;
    this.marks = marks;
  }
}

export async function subjectmarksByStudent(ctx: Context){
  try{
    const studentId:number = ctx.request.params.studentId;
    const subjectMarksInfo:subjectmarks[] = subjectMarksByStudent(studentId);

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(subjectMarksInfo); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get subject marks by student."; 
      return ;
    }
}

export async function topstudentWithSubject(ctx: Context){
  try{
    const classId:number = ctx.request.params.classId;
    const res:results[] = topStudentWithSubject(classId);
    let result:studentMarksBody[] = [];

    for(let i=0;i<res.length;i++) {
      let studentId = res[i].student_id;
      let student:student = getStudentInfoByStudentId(studentId);
      let studentInfo = new studentMarksBody(student, res[i].subject_id, res[i].marks);
      result.push(studentInfo);
    }
    
    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(result); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get top student with subjectid"; 
      return ;
    }
}

export async function topscoreStudents(ctx: Context){
  try{
    const classId:number = ctx.request.query.classId;
    const subjectId:number = ctx.request.query.subjectId;
    const topStudents:results[] = topScoreStudents(classId, subjectId);

    let result:studentMarksBody[] = [];

    for(let i=0;i<topStudents.length;i++) {
      let studentId = topStudents[i].student_id;
      let student:student = getStudentInfoByStudentId(studentId);
      let studentInfo = new studentMarksBody(student, topStudents[i].subject_id, topStudents[i].marks);
      result.push(studentInfo);
    }

    ctx.response.status = 200;
    ctx.response.type = 'text/html';
    ctx.body = JSON.stringify(result); 
    }catch(err){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "could not get top students."; 
      return ;
    }
}

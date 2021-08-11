import { Context } from "vm";
const scheduleValidation = require('../validation/schedule_validation');
const {addSchedule, classByTeacher, studentByClass, classBySubject} = require('../services/schedule.ts');
const {getStudentListByStudentId} = require('../services/student');

interface schedule {
  class_id:number;
  subject_id: number;
	teacher_id: number;
}

interface studentid_object{
  student_id:number;
}

export async function addschedule(ctx: Context){
  const scheduleInfo:schedule = ctx.request.body;
  try{
    try{
      await scheduleValidation.addScheduleSchema.validateAsync(scheduleInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = await addSchedule(scheduleInfo.class_id,scheduleInfo.subject_id,scheduleInfo.teacher_id);
    
    ctx.response.status = 200;
    ctx.body = {
      message: ` Entry successful into schedule table`,
      result: res
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not add entry to schedule table: ${err.message}`
      }
      return ;
    }
}

export async function studentsbyClass(ctx: Context){
  const classId:number = ctx.request.params.classId;
  try{
    try{
      await scheduleValidation.studentsbyClassSchema.validateAsync({classId});
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const studentId:studentid_object[] = await studentByClass(classId);
    console.log(studentId);
    const arr:number[] = [];
    for(let i=0;i<studentId.length;i++){
      console.log(studentId[i].student_id);
      arr.push(studentId[i].student_id);
    }
    console.log(arr);
    console.log(await getStudentListByStudentId(arr));
    const result = await getStudentListByStudentId(arr);
    let str:string = '';
    for(let i=0;i<result.length;i++){
      str += result[i].student_name;
      str += ' ';
    }
    //console.log(JSON.stringify(result));
    ctx.response.status = 200;
    //ctx.body = JSON.stringify(result); 
    ctx.body = str;
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not get student by class: ${err.message}`
      }
      return ;
    }
}

export async function studentsByTeacher(ctx: Context){
  const teacherId:number = ctx.request.params.teacherId;
  try{
    try{
      await scheduleValidation.studentsbyTeacherSchema.validateAsync(teacherId);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
  const classId:number = (await classByTeacher(teacherId)).class_id;
    //console.log((await classByTeacher(teacherId)).class_id);
    console.log(classId);
    const studentId:studentid_object[] = await studentByClass(classId);
    console.log(studentId);
    const arr:number[] = [];
    for(let i=0;i<studentId.length;i++){
      console.log(studentId[i].student_id);
      arr.push(studentId[i].student_id);
    }
    console.log(arr);
    console.log(await getStudentListByStudentId(arr));
    const result = await getStudentListByStudentId(arr);
    let str:string = '';
    for(let i=0;i<result.length;i++){
      str += result[i].student_name;
      str += ' ';
    }
    //console.log(JSON.stringify(result));
    ctx.response.status = 200;
    //ctx.body = JSON.stringify(result); 
    ctx.body = str;
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not get student by teacher: ${err.message}`
      }
      return ;
    }
}

export async function studentsBySubject(ctx: Context){
  const subjectId:number = ctx.request.params.subjectId;
  try{
    try{
      await scheduleValidation.studentsbySubjectSchema.validateAsync(subjectId);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const classId:number = (await classBySubject(subjectId)).class_id;
    const studentId:studentid_object[] = await studentByClass(classId);
    console.log(studentId);
    const arr:number[] = [];
    for(let i=0;i<studentId.length;i++){
      console.log(studentId[i].student_id);
      arr.push(studentId[i].student_id);
    }
    console.log(arr);
    console.log(await getStudentListByStudentId(arr));
    const result = await getStudentListByStudentId(arr);
    let str:string = '';
    for(let i=0;i<result.length;i++){
      str += result[i].student_name;
      str += ' ';
    }
    //console.log(JSON.stringify(result));
    ctx.response.status = 200;
    //ctx.body = JSON.stringify(result); 
    ctx.body = str;
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not get student by subject: ${err.message}`
      }
      return ;
    }
}

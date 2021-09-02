import { Context } from "vm";

export {};
const combineRouters = require('koa-combine-routers');
const Router = require('koa-router');
const {addStudentToClassList, addSchedule, addStudentToList, updateStudentToList, addSubjectToList, updateSubjectInList, addTeacherToList, updateTeacherInList } = require('./unit.ts');

const router = new Router();
const studentValidation = require('../validation/student_validation');
const subjectValidation = require('../validation/subject_validation');
const teacherValidation = require('../validation/teacher_validation.ts');
const classValidation = require('../validation/class_validation');
const scheduleValidation = require('../validation/schedule_validation');

interface schedule {
  class_id:number;
  subject_id: number;
	teacher_id: number;
}

interface student_class{
  student_id: number;
	class_id: number;
}

interface teacher{
  teacher_id: number;
	teacher_name: string;
	teacher_dob: Date;
	teacher_address: string;
	teacher_gender: string;
	teacher_phone: number;
}
interface student{
  student_id: number;
	student_name: string;
	student_dob: Date;
	student_address: string;
	student_gender: string;
	student_phone: number;
}
interface subject{
  subject_id: number;
	subject_name: string;
}

router.post('/class/addstudentToClassList', async (ctx:Context)=>{
  const classInfo:student_class = ctx.request.body;
  
    const value = await classValidation.addstudentToClassListSchema.validate(classInfo);
    if(value.error){
    console.log(value.error);
    ctx.response.type = 'text/html';
    ctx.response.status = 400;
    ctx.response.body = 'Invalid parameters passed';
    return;
  }
    const res = await addStudentToClassList(classInfo.student_id,classInfo.class_id);
    
    ctx.body = {res};
});

router.post('/schedule/addschedule', async (ctx: Context)=>{
  const scheduleInfo:schedule = ctx.request.body;
  
    const value = await scheduleValidation.addScheduleSchema.validate(scheduleInfo);
    if(value.error){
    console.log(value.error);
    ctx.response.type = 'text/html';
    ctx.response.status = 400;
    ctx.response.body = 'Invalid parameters passed';
    return;
  }
    const res = await addSchedule(scheduleInfo.class_id,scheduleInfo.subject_id,scheduleInfo.teacher_id);
    ctx.body = {res};
});

router.post('/student/addstudentToList',async (ctx: Context) =>{
  const studentInfo:student = ctx.request.body;
  const value = await studentValidation.addOrUpdateStudentToListSchema.validate(studentInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
  const res = await addStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
  ctx.body = {res};
});

router.put('/student/updatestudentToList', async (ctx: Context)=>{
  const studentInfo:student = ctx.request.body;
  const value = await studentValidation.addOrUpdateStudentToListSchema.validate(studentInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await updateStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
    ctx.body = {res};
});

router.post('/subject/addsubjectToList', async (ctx: Context)=>{
  const subjectInfo:subject = ctx.request.body;

    const value = await subjectValidation.addOrUpdateSubjectToListSchema.validate(subjectInfo);
    if(value.error){
    console.log(value.error);
    ctx.response.type = 'text/html';
    ctx.response.status = 400;
    ctx.response.body = 'Invalid parameters passed';
    return;
  }
    const res = await addSubjectToList(subjectInfo.subject_id,subjectInfo.subject_name);
    
    ctx.body = {res};
});

router.put('/subject/updateSubjectToList', async (ctx: Context)=>{
  const subjectInfo:subject = ctx.request.body;
  
    const value = await subjectValidation.addOrUpdateSubjectToListSchema.validate(subjectInfo);
    if(value.error){
    console.log(value.error);
    ctx.response.type = 'text/html';
    ctx.response.status = 400;
    ctx.response.body = 'Invalid parameters passed';
    return;
  }
    const res = await updateSubjectInList(subjectInfo.subject_id,subjectInfo.subject_name);
    ctx.body = {res};
});

router.post('/teacher/addteacherToList', async (ctx: Context)=>{
  const teacherInfo: teacher = ctx.request.body;
      const value = await teacherValidation.addOrUpdateTeacherToListSchema.validate(teacherInfo);
      //console.log(value);
      //console.log(error);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await addTeacherToList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    ctx.body = {res};
});

router.put('/teacher/updateTeacherToList', async (ctx: Context)=>{
  const teacherInfo:teacher = ctx.request.body;

    const value = await teacherValidation.addOrUpdateTeacherToListSchema.validate(teacherInfo);
    if(value.error){
    console.log(value.error);
    ctx.response.type = 'text/html';
    ctx.response.status = 400;
    ctx.response.body = 'Invalid parameters passed';
    return;
  }
    const res = await updateTeacherInList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    ctx.body = {res};
});

const studentRouter = combineRouters (
  router
);
module.exports = studentRouter;

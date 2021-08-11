import { Context } from "vm";
const teacherValidation = require('../validation/teacher_validation');
const {getTeacherList,addTeacherToList, updateTeacherInList} = require('../services/teacher.ts');

interface teacher{
  teacher_id: number;
	teacher_name: string;
	teacher_dob: Date;
	teacher_address: string;
	teacher_gender: string;
	teacher_phone: number;
}

export async function getteacherList(ctx: Context){
  try {
    const teacherList = await getTeacherList();
    ctx.response.status = 200;
    ctx.response.body = {
      data: teacherList
    }
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: `data not fetched: ${e.message}`
    };
  }
};

export async function addteacherToList(ctx: Context){
  const teacherInfo:teacher = ctx.request.body;
  try{
    try{
      await teacherValidation.addOrUpdateTeacherToListSchema.validateAsync(teacherInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = await addTeacherToList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    
    ctx.response.status = 200;
    ctx.body = {
      message: `Teacher inserted into teachers table`,
      result: `${res}`
    } 
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not add teacher to teachers table: ${err.message}`
      }
      return ;
    }
}

export async function updateTeacherToList(ctx: Context){
  const teacherInfo:teacher = ctx.request.body;
  try{
    try{
      await teacherValidation.addOrUpdateTeacherToListSchema.validateAsync(teacherInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = await updateTeacherInList(teacherInfo.teacher_id,teacherInfo.teacher_name,teacherInfo.teacher_dob,teacherInfo.teacher_address,teacherInfo.teacher_gender,teacherInfo.teacher_phone);
    
    ctx.response.status = 200;
    ctx.body = {
      message: `Teacher updated in teachers table`,
      result: `${res}`
    } 
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not update teacher in teachers table: ${err.message}`
      }
      return ;
    }
}

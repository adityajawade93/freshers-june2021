import { Context } from "vm";
const classValidation = require('../validation/class_validation');
const {getClassList,addStudentToClassList, getStudentsByClass} = require('../services/class.ts');

interface student_class{
  student_id: number;
	class_id: number;
}

async function getclassList(ctx: Context){
  try {
    const classList = await getClassList();
    ctx.response.status = 200;
    ctx.response.body = {
      data: classList
    }
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: `data not fetched: ${e.message}`
    };
  }
};

async function addstudentToClassList(ctx: Context){
  const classInfo:student_class = ctx.request.body;
  try{
    try{
      await classValidation.addstudentToClassListSchema.validateAsync(classInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = await addStudentToClassList(classInfo.student_id,classInfo.class_id);
    
    ctx.response.status = 200;
    ctx.body = {
        data: `Student inserted into student_class table ${res}`
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not add student to student_class table ${err.message}`
      } 
      return ;
    }
}

async function getstudentsByClass(ctx: Context){
  const classId:number = ctx.request.params.classId;
  try {
    try{
      await classValidation.getstudentsByClassSchema.validateAsync(classId);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const classList = await getStudentsByClass(classId);
    ctx.response.status = 200;
    ctx.response.body = {
      data: classList
    }
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: `data not fetched: ${e.message}`
    }
  }
};

module.exports = {getclassList, addstudentToClassList, getstudentsByClass};

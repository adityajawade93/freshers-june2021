import { Context } from "vm";
const studentValidation = require('../validation/student_validation');
//const {Context} = require('vm');

const {getStudentList,getStudentInfoByStudentId, addStudentToList, updateStudentToList } = require('../services/student.ts');

interface student{
  student_id: number;
	student_name: string;
	student_dob: Date;
	student_address: string;
	student_gender: string;
	student_phone: number;
}

async function getstudentList(ctx: Context){
  const page: number = parseInt(ctx.request.query.page);
  const limit: number = parseInt(ctx.request.query.size);

  try{
    const studentList = await getStudentList();
    
    try{
      await studentValidation.getStudentListSchema.validateAsync({page,limit});
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    let results: object = {};

    try {
      results = await studentList.slice(startIndex, endIndex);
      console.log(results);
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Student list for given page and size',
        data: results
      }
    } catch (e) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: `data not fetched: + ${e.message}`
      }
    }
  }
  catch (err){
    ctx.response.status = 500;
    ctx.response.body = {
      error:`data not fetched from studentList: + ${err.message}`
    };
  }
};

async function getstudentInfoByStudentId(ctx: Context){
  const studentId:number = parseInt(ctx.request.params.studentId);
  try{
    try{
      await studentValidation.getstudentInfoByStudentIdSchema.validateAsync({studentId});
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const studentInfo:student = await getStudentInfoByStudentId(studentId);
    
    console.log(typeof(studentInfo));
    console.log(studentInfo);
    try{
      await studentValidation.addOrUpdateStudentToListSchema.validateAsync(studentInfo);
    } catch(err){
      console.log(err.message);
      //ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.response.body = {error:"The Request is not valid"};
    }
    /*if(typeof studentInfo.student_id!=='number' || typeof studentInfo.student_name!=='string' || studentInfo.student_name.trim()===""|| typeof studentInfo.student_gender!=='string' || typeof studentInfo.student_phone!=='string'|| typeof studentInfo.student_address!=='string'){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "The Request is not valid"; 
      return ;
    }*/
    ctx.response.status = 200;
    ctx.body = {
      data: studentInfo
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {error: `could not get student information: ${err.message}`}; 
      return ;
    }
}

async function addstudentToList(ctx: Context){
  const studentInfo:student = ctx.request.body;
  try{
    try{
      await studentValidation.addOrUpdateStudentToListSchema.validateAsync(studentInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = addStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
   
    ctx.response.status = 200;
    ctx.body = {
      message: 'Student inserted into students table',
      result: `${res} + Student inserted into students table`
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not add student to students table: ${err.message}`
      }
      return ;
    }
}

async function updatestudentToList(ctx: Context){
  const studentInfo:student = ctx.request.body;
  try{
    try{
      await studentValidation.addOrUpdateStudentToListSchema.validateAsync(studentInfo);
    } catch(err){
      console.log(err.message);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
    }
    const res = updateStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
   
    ctx.response.status = 200;
    ctx.body = {
      message: 'Student updated in students table',
      result: `${res} + Student updated into students table`
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not update student in students table: ${err.message}`
      }
      return ;
    }
}
exports.getstudentList = getstudentList;
exports.getstudentInfoByStudentId = getstudentInfoByStudentId;
exports.addstudentToList = addstudentToList;
exports.updatestudentToList = updatestudentToList;

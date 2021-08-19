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
  const page = ctx.request.query.page;
  const limit = ctx.request.query.size;
  console.log(page);
  console.log(limit);

  try{
    const studentList = await getStudentList();
    
      const value = await studentValidation.getStudentListSchema.validate({page,limit});
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    let results;

    try {
      results = await studentList.slice(startIndex, endIndex);
      console.log(results);
      if(results.length == 0){
        throw new Error('page no. or size is out of range');
      }
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Student list for given page and size',
        data: results
      }
    } catch (e) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: `data not fetched: ${e.message}`
      }
      return;
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
  const studentId:number = ctx.request.params.studentId;
  try{
      const value = await studentValidation.getstudentInfoByStudentIdSchema.validate({studentId});
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const studentInfo:student = await getStudentInfoByStudentId(studentId);
    
    //console.log(typeof(studentInfo));
    //console.log(studentInfo);
    
      const val = await studentValidation.addOrUpdateStudentToListSchema.validate(studentInfo);
      console.log(val);
      if(val.value === undefined){
      //ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.response.body = {error:"The Request is not valid"};
      return;
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
      const value = await studentValidation.addOrUpdateStudentToListSchema.validate(studentInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await addStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
    console.log(res);
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
      const value = await studentValidation.addOrUpdateStudentToListSchema.validate(studentInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await updateStudentToList(studentInfo.student_id,studentInfo.student_name,studentInfo.student_dob,studentInfo.student_address,studentInfo.student_gender,studentInfo.student_phone);
    console.log(res);
    if(res.rowCount == 0){
      throw new Error('0 rows updated');
    }
    ctx.response.status = 200;
    ctx.body = {
      message: 'Student updated in students table',
      result: `${res.resCount} + Student updated into students table`
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

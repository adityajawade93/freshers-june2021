import { Context } from "vm";
const subjectValidation = require('../validation/subject_validation');
const {getSubjectList,addSubjectToList, updateSubjectInList} = require('../services/subject.ts');

interface subject{
  subject_id: number;
	subject_name: string;
}

async function getsubjectList(ctx: Context){
  try {
    const subjectList = await getSubjectList();
    ctx.response.status = 200;
    ctx.response.body = {
      data: subjectList
    }
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: `data not fetched: ${e.message}`
    }
  }
};

async function addsubjectToList(ctx: Context){
  const subjectInfo:subject = ctx.request.body;
  try{
      const value = await subjectValidation.addOrUpdateSubjectToListSchema.validate(subjectInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await addSubjectToList(subjectInfo.subject_id,subjectInfo.subject_name);
    
    ctx.response.status = 200;
    ctx.body = {
      message: `Subject inserted into subjects table`,
      data: res
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not add subject to subjects table: ${err.message}`
      }
      return ;
    }
}

async function updateSubjectToList(ctx: Context){
  const subjectInfo:subject = ctx.request.body;
  try{
      const value = await subjectValidation.addOrUpdateSubjectToListSchema.validate(subjectInfo);
      if(value.error){
      console.log(value.error);
      ctx.response.type = 'text/html';
      ctx.response.status = 400;
      ctx.response.body = 'Invalid parameters passed';
      return;
    }
    const res = await updateSubjectInList(subjectInfo.subject_id,subjectInfo.subject_name);
    if(res.rowCount == 0){
      throw new Error('0 rows updated');
    }
    ctx.response.status = 200;
    ctx.body = {
      message: `Subject updated in subjects table`,
      data: res
    }
    }catch(err){
      ctx.response.status = 500;
      ctx.body = {
        error: `Could not update subject in subjects table: ${err.message}`
      }
      return ;
    }
}

module.exports = {getsubjectList, addsubjectToList, updateSubjectToList};

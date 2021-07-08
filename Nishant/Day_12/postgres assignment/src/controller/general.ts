import { Context } from "vm";

import * as servicegeneral from '../services/general';

interface ITopper{
    student_id:number;
    fname:string;
    marks:number;
}



export async function gettopperByclassIdAndSubjectId(ctx: Context){
    try{
        let {classId,subjectId}:{classId:number,subjectId:number}=ctx.params;
        classId=Number(classId);
        subjectId=Number(subjectId);
      if(classId===undefined || typeof classId!=='number' || subjectId===undefined || typeof subjectId!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
      let [rows]: Array<{rows: ITopper}>=[];
      rows=await  servicegeneral.get_topper_by_classid_and_subjectid(classId,subjectId);
       
          ctx.response.status = 200;
          ctx.response.type = 'application/json';
        ctx.body=rows.rows;
      }catch(err){
        ctx.response.status = 500;
        ctx.response.type = 'text/html';
        ctx.body = "internal server error"; 
        return ;
      }
}

export async function gettopstudent(ctx: Context){
  try{
    let {classId,count}:{classId:number,count:number}=ctx.params;
    classId=Number(classId);
    count=Number(count);
    if(classId===undefined || typeof count!=='number')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
    let [rows]: Array<{rows: ITopper}>=[];
    rows=await  servicegeneral.get_top_students(classId,count);
     
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
}
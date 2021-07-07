import { Context } from "vm";

import * as servicegeneral from '../services/general';

interface topper{
    student_id:number;
    fname:string;
    marks:number;
}

export async function gettopperByclassIdAndSubjectId(ctx: Context){
    try{
        var c_id=parseInt(ctx.params.c_id);
        var s_id=parseInt(ctx.params.s_id);
      if(c_id===undefined || typeof c_id!=='number' || s_id===undefined || typeof s_id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
      let [rows]: Array<{rows: topper}>=[];
      rows=await  servicegeneral.get_topper_by_classid_and_subjectid(c_id,s_id);
       
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
      var c_id=parseInt(ctx.params.c_id);
      var num=parseInt(ctx.params.num);
    if(c_id===undefined || typeof c_id!=='number')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
    let [rows]: Array<{rows: topper}>=[];
    rows=await  servicegeneral.get_top_students(c_id,num);
     
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
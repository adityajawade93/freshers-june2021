import { Context } from "vm";

import * as servicesubject from '../services/subject';


interface subject_data{
    subject_id:number;
    subject_name:string;
}

interface student_details_data{
    student_id:number;
    fname:string;
}

interface student_marks{
    subject_id:number;
    subject_name:string;
    marks:number;
}

export async function getSubject(ctx: Context){
    try{
        let [rows]: Array<{rows: subject_data}>=[];
        rows=await servicesubject.get_subject();
         
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

export async function getStudentBySubjectId(ctx: Context){
    try{
        var id:number=parseInt(ctx.url.substring(9));
        if(id===undefined || typeof id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
        let [rows]: Array<{rows: student_details_data}>=[];
        rows=await  servicesubject.get_student_by_subjectid(id);
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

export async function getSubjectMarksByStudentId(ctx: Context){
    try{
        var id:number=parseInt(ctx.url.substring(7));
        if(id===undefined || typeof id!=='number')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
        let [rows]: Array<{rows: student_marks}>=[];
        rows=await  servicesubject.get_subjectmarks_by_subjectid(id);
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

export async function addSubject(ctx: Context){
    try{
        let req:subject_data=ctx.request.body;
        if(req.subject_id===undefined || req.subject_name===undefined || typeof req.subject_id!=='number' || typeof req.subject_name!=='string' || req.subject_name.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  servicesubject.add_subject(req.subject_id,req.subject_name);
     
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in Subject table";
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ; 
        }
}
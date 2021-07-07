import { Context } from "vm";

import * as serviceteacher from '../services/teacher';

interface teacher_data{
    teacher_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: CharacterData;
    address:string;
}

interface student_details_data{
  student_id:number;
  fname:string;
}

export async function getTeacher(ctx: Context){
    try{
        let [rows]: Array<{rows: teacher_data}>=[];
        rows=await  serviceteacher.get_teacher();
        
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

export async function getStudentByTeacherId(ctx: Context){
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
       rows=await  serviceteacher.get_student_by_teacherid(id);
         
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

export async function addTeacher(ctx: Context){
    try{
        let req:teacher_data=ctx.request.body;
        if(req.teacher_id===undefined || req.fname===undefined || req.mname===undefined || req.lname===undefined || req.dob===undefined || req.gender===undefined || req.address===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( req.fname.trim()==='' || req.mname.trim()==='' || req.lname.trim()==='' || req.address.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.teacher_id!=='number' || typeof req.fname!=='string' || typeof req.mname!=='string' || typeof req.lname!=='string' || typeof req.dob!=='string' || typeof req.gender!=='string' || typeof req.address!=='string'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  serviceteacher.add_teacher(req.teacher_id,req.fname,req.mname,req.lname,req.dob,req.gender,req.address);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in teacher table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

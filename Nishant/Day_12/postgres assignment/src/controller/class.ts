import { Context } from "vm";

import * as serviceclass from '../services/class';

interface  class_schedule_data{
    classid:number;
    classno:number;
    subj_id:number;
    subj_name:string;
    t_id:number;
    t_fname:string;
}

interface class_student_data{
    class_id:number;
    studid:number
}

interface student_details_data{
    student_id:number;
    fname:string;
}

export async function getClass(ctx: Context){
    try{
        let [rows]: Array<{rows: class_schedule_data}>=[];
        rows=await  serviceclass.get_class();
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

export async function getStudentByClassId(ctx: Context){
    try{
        var id:number=parseInt(ctx.params.id);
        if(id===undefined || typeof id!=='number')
        {
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
        ctx.body ='Bad Request';
        return ;
        }
        let [rows]: Array<{rows: student_details_data}>=[];
        rows=await  serviceclass.get_student_by_classid(id);
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

export async function addStudentInClass(ctx: Context){
    try{
        let req:class_student_data=ctx.request.body;
        if(req.class_id===undefined || req.studid===undefined || typeof req.class_id!=='number' || typeof req.studid!=='number'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await  serviceclass.add_student_in_class(req.class_id,req.studid);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data is inserted in Class_student table";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ; 
        }
}

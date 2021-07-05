import { rawListeners } from "process";

const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
const fn = require("./tables");
let app=new koa();
let router=new koarouter();



interface student{
    roll_num: number;
    fname:string;
    lname:string;
    standard:number;
    subcode : number;
    slice(a:number,b:number): student;
}

interface teacher{
    staffid: number;
    fname:string;
    lname:string;
    subcode: number;
}

interface subject{
    subcode:number;
    subject:string;
    staffid:number;
}

interface  class_schedule{
    uniclassid :string;
    Standard:number;
    classno:number;
    subcode:number;
    subject:string;
    staffid:number;
    T_fname:string;
}

interface marks_data{
    resultsid:number;
    roll_num:number;
    subcode:number;
    staffid: number;
    standard:number;
    marks:number;
}


router.post('/createstudent', async(ctx: any, next: any) =>{
    try{
        let req:student=ctx.request.body;
        if(req.roll_num===undefined || req.fname===undefined || req.lname===undefined || req.standard===undefined || req.subcode===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( req.fname.trim()==='' || req.lname.trim()==='' ){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.roll_num!=='number' || typeof req.fname!=='string' || typeof req.lname!=='string' || typeof req.standard!=='number' || typeof req.subcode!=='number'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await fn.execute1(req.roll_num,req.fname,req.lname,req.standard,req.subcode);
       
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data inserted in Students";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ; 
        }
});

router.post('/createsubject', async(ctx: any, next: any) =>{
    try{
        let req:subject=ctx.request.body;
        if(req.subcode===undefined || req.subject===undefined || typeof req.staffid===undefined || typeof req.staffid!=='number' ||typeof req.subcode!=='number' || req.subject.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await fn.execute2(req.subcode,req.subject,req.staffid);

     
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data inserted in Subjects";
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "server error"; 
          return ; 
        }
});

router.post('/createteacher', async(ctx: any, next: any) =>{
    try{
        let req:teacher=ctx.request.body;
        if(req.staffid===undefined || req.fname===undefined || req.lname===undefined || req.subcode===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( req.fname.trim()===''|| req.lname.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(typeof req.staffid!=='number' || typeof req.fname!=='string' || typeof req.lname!=='string' || typeof req.subcode!=='number' ){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
          await fn.execute3(req.staffid,req.fname,req.lname,req.subcode);
          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data inserted in Teachers";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = " server error"; 
      return ; 
        }
});

router.post('/class_schedule', async(ctx: any, next: any) =>{
    try{
        let req:class_schedule=ctx.request.body;
        if(req.uniclassid===undefined || req.Standard===undefined || req.classno===undefined || req.subcode===undefined || req.subject===undefined || req.staffid===undefined || req.T_fname===undefined){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if( typeof req.Standard!=='number' || typeof req.classno!=='number' || typeof req.subcode!=='number' || typeof req.subject!=='string' || typeof req.staffid!=='number' || typeof req.T_fname!=='string'){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }

        if(req.subject.trim()==='' || req.T_fname.trim()===''){
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
          ctx.body = "Bad Request"; 
          return ;
        }
        await fn.execute4(req.uniclassid,req.Standard,req.classno,req.subcode,req.subject,req.staffid,req.T_fname);

          ctx.response.status = 200;
          ctx.response.type = 'text/html';
          ctx.body="data inserted in Class_schedule";
        }catch(err){
          ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ; 
        }
});

router.post('/addmarks', async(ctx: any, next: any) =>{
    
        try{
            let req:marks_data=ctx.request.body;
            if(req.resultsid===undefined || req.roll_num===undefined || req.subcode===undefined || req.staffid===undefined || req.standard===undefined || req.marks===undefined){
              ctx.response.status = 400;
              ctx.response.type = 'text/html';
              ctx.body = "Bad Request"; 
              return ;
            }
    
            if(typeof req.resultsid!=='number' || typeof req.roll_num!=='number' || typeof req.subcode!=='number' || typeof req.staffid!=='number' || typeof req.standard!=='number'  || typeof req.marks!=='number'){
              ctx.response.status = 400;
              ctx.response.type = 'text/html';
              ctx.body = "Bad Request"; 
              return ;
            }
         await fn.execute5(req.resultsid,req.roll_num,req.subcode,req.staffid,req.standard,req.marks);
              ctx.response.status = 200;
              ctx.response.type = 'text/html';
              ctx.body="data inserted in marks";
            }catch{
              ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "server error"; 
              return ; 
            }
        
});
app.use(bodyParser());
app.use(router.routes());
app.use(async ctx =>{
    
  ctx.response.status = 404;
  ctx.response.type = 'text/html';
ctx.body = 'Not Found';
});
app.listen(5000,()=>{
    console.log("server is up at 5000");
 });
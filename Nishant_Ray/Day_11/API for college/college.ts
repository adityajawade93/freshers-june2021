import { Context } from "vm";

const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
const {Pool}=require('pg');
const pool=new Pool({
   user:'postgres',
   password:'welcome@123',
   host:'localhost',
   database:'postgres',
   port:'5432'
});
let app=new koa();
let router=new koarouter();



interface student_data{
    student_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: CharacterData;
    address:string;
    slice(a:number,b:number): student_data;
}

interface teacher_data{
    teacher_id: number;
    fname:string;
    mname:string;
    lname:string;
    dob :Date;
    gender: CharacterData;
    address:string;
}

interface subject_data{
    subject_id:number;
    subject_name:string;
}

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

interface student_marks{
    subject_id:number;
    subject_name:string;
    marks:number;
}

interface topper{
    student_id:number;
    fname:string;
    marks:number;
}

interface result_data{
    result_id:number;
    studentid:number;
    clas_id:number;
    subjectid:number;
    marks:number;
}

// get student data with pagination
router.get('/student',async (ctx:Context)=>{
  try{
    let [rows]: Array<{rows: student_data}>=[];
    let length;
  await  execute();
   async function execute(){
    const client=await pool.connect();
    await client.query("SET search_path TO College");
        rows=await client.query("SELECT * FROM Student");
        length=await client.query("SELECT Count(*) FROM Student");
        await client.release();
    }
  
    const page = parseInt(ctx.request.query.page);
    const size= parseInt(ctx.request.query.size);
    const totalPages=Math.ceil(length.rows[0].count/ size) ;
    if(page===undefined || size===undefined || typeof page!=='number' || typeof size!=='number'){
      ctx.response.status = 400;
       ctx.response.type = 'text/html';
       ctx.body = "Bad Request";
       return;
    }

    if(page<0 || size<0 || page>totalPages){
      ctx.response.status = 404;
       ctx.response.type = 'text/html';
       ctx.body = "Not Found";
       return;
    }

    const startid=page*size;
    const endid=Math.min((page+1)*size,length.rows[0].count);
      let req_data=rows.rows;
      req_data=(req_data).slice(startid,endid);
      ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=req_data;
  }catch(err){
        ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
});

// get teacher data
router.get('/teacher',async (ctx:Context)=>{
  try{
  let [rows]: Array<{rows: teacher_data}>=[];
  await  execute();
   async function execute(){
  const client=await pool.connect();
  await client.query("SET search_path TO College");
        rows=await client.query("SELECT * FROM Teacher"); 
        await client.release();
      }
      ctx.response.status = 200;
      ctx.response.type = 'application/json';
    ctx.body=rows.rows;
  }catch(err){
    ctx.response.status = 500;
    ctx.response.type = 'text/html';
    ctx.body = "internal server error"; 
    return ;
  }
});

  // get subject data
  router.get('/subject',async (ctx:Context)=>{
    try{
    let [rows]: Array<{rows: subject_data}>=[];
    await  execute();
     async function execute(){
      const client=await pool.connect();
      await client.query("SET search_path TO College");
          rows=await client.query("SELECT * FROM subject"); 
          await client.release();
        }
        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
  });

  //get class_stduent data
  router.get('/class',async (ctx:Context)=>{
    try{
    let [rows]: Array<{rows: class_schedule_data}>=[];
    await  execute();
     async function execute(){
      const client=await pool.connect();
      await client.query("SET search_path TO College");
          rows=await client.query("SELECT * FROM Class_schedule"); 
          await client.release();
        }
        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
  });

  //get student in class data
  router.get('/class/:id',async (ctx:Context)=>{
    try{
    var id:number=ctx.url.substring(7);
    if(id===undefined || typeof id!=='number')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
    let [rows]: Array<{rows: student_details_data}>=[];
    await  execute();
     async function execute(){
      const client=await pool.connect();
      await client.query("SET search_path TO College");
          rows=await client.query(`SELECT S.student_id,S.fname FROM Student,class_student WHERE class_id=${id} AND studid=student_id`); 
          await client.release();
        }
        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
    });

    // get student under teacher data
    router.get('/teacher/:id',async (ctx:Context)=>{
      try{
      var id:number=ctx.url.substring(9);
      if(id===undefined || typeof id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
      let [rows]: Array<{rows: student_details_data}>=[];
      await  execute();
       async function execute(){
        const client=await pool.connect();
        await client.query("SET search_path TO College");
            rows=await client.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=${id} AND class_id=classid AND studid=student_id`); 
        await client.release();
          }
          ctx.response.status = 200;
          ctx.response.type = 'application/json';
        ctx.body=rows.rows;
      }catch(err){
        ctx.response.status = 500;
        ctx.response.type = 'text/html';
        ctx.body = "internal server error"; 
        return ;
      }
      });

      // get student in subject data
      router.get('/subject/:id',async (ctx:Context)=>{
        try{
        var id:number=ctx.url.substring(9);
        if(id===undefined || typeof id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
        let [rows]: Array<{rows: student_details_data}>=[];
        await  execute();
         async function execute(){
          const client=await pool.connect();
          await client.query("SET search_path TO College");
              rows=await client.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=${id} AND class_id=classid AND studid=student_id`); 
          await client.release();
            }
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "internal server error"; 
          return ;
        }
        });

        // get  marks in the subject data
        router.get('/marks/:id',async (ctx:Context)=>{
          try{
          var id:number=ctx.url.substring(7);
          if(id===undefined || typeof id!=='number')
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
          let [rows]: Array<{rows: student_marks}>=[];
          await  execute();
           async function execute(){
            const client=await pool.connect();
            await client.query("SET search_path TO College");
                rows=await client.query(`SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=${id} AND subjectid=subject_id`); 
            await client.release();
              }
              ctx.response.status = 200;
              ctx.response.type = 'application/json';
            ctx.body=rows.rows;
          }catch(err){
            ctx.response.status = 500;
            ctx.response.type = 'text/html';
            ctx.body = "internal server error"; 
            return ;
          }
          });

          // get topper in class and subject data
          router.get('/topclass/:c_id/topsubject/:s_id',async (ctx:Context)=>{
            try{
              var c_id=ctx.params.c_id;
              var s_id=ctx.params.s_id;
            if(c_id===undefined || typeof c_id!=='number' || s_id===undefined || typeof s_id!=='number')
            {
              ctx.response.status = 400;
              ctx.response.type = 'text/html';
            ctx.body ='Bad Request';
            return ;
            }
            let [rows]: Array<{rows: topper}>=[];
            await  execute();
             async function execute(){
              const client=await pool.connect();
              await client.query("SET search_path TO College");
                  rows=await client.query(`SELECT student_id,fname,S.marks FROM (SELECT * FROM result WHERE clas_id=${c_id} AND subjectid=${s_id} ORDER BY marks DESC) AS S,Student WHERE S.studentid=student_id LIMIT 1`); 
              await client.release();
                }
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
              ctx.body=rows.rows;
            }catch(err){
              ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "internal server error"; 
              return ;
            }
            });

            // create student data
              router.post('/createstudent',async (ctx:Context)=>{
                try{
                let req:student_data=ctx.request.body;
                if(req.student_id===undefined || req.fname===undefined || req.mname===undefined || req.lname===undefined || req.dob===undefined || req.gender===undefined || req.address===undefined){
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

                if(typeof req.student_id!=='number' || typeof req.fname!=='string' || typeof req.mname!=='string' || typeof req.lname!=='string' || typeof req.dob!=='string' || typeof req.gender!=='string' || typeof req.address!=='string'){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }

                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.student_id,req.fname,req.mname,req.lname,req.dob,req.gender,req.address];
                
                await client.query("INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in student table";
                }catch(err){
                  ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "internal server error"; 
              return ; 
                }
              });

              // create teacher data
              router.post('/createteacher',async (ctx:Context)=>{
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
                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.teacher_id,req.fname,req.mname,req.lname,req.dob,req.gender,req.address];
                await client.query("INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in teacher table";
                }catch(err){
                  ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "internal server error"; 
              return ; 
                }
              });

              // create class_student data
              router.post('/createclass_student',async (ctx:Context)=>{
                try{
                let req:class_student_data=ctx.request.body;
                if(req.class_id===undefined || req.studid===undefined || typeof req.class_id!=='number' || typeof req.studid!=='number'){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }
                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.class_id,req.studid];
                await client.query("INSERT INTO class_student values($1,$2)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in Class_student table";
                }catch(err){
                  ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "internal server error"; 
              return ; 
                }
              });

              // create subject data
              router.post('/createsubject',async (ctx:Context)=>{
                try{
                let req:subject_data=ctx.request.body;
                if(req.subject_id===undefined || req.subject_name===undefined || typeof req.subject_id!=='number' || typeof req.subject_name!=='string' || req.subject_name.trim()===''){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }
                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.subject_id,req.subject_name];
                await client.query("INSERT INTO Subject values($1,$2)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in Subject table";
                }catch(err){
                  ctx.response.status = 500;
                  ctx.response.type = 'text/html';
                  ctx.body = "internal server error"; 
                  return ; 
                }
              });

              // create class_schedule data
              router.post('/createclass_schedule',async (ctx:Context)=>{
                try{
                let req:class_schedule_data=ctx.request.body;
                if(req.classid===undefined || req.classno===undefined || req.subj_id===undefined || req.subj_name===undefined || req.t_id===undefined || req.t_fname===undefined){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }

                if(typeof req.classid!=='number' || typeof req.classno!=='number' || typeof req.subj_id!=='number' || typeof req.subj_name!=='string' || typeof req.t_id!=='number' || typeof req.t_fname!=='string'){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }

                if(req.subj_name.trim()==='' || req.t_fname.trim()===''){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }
                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.classid,req.classno,req.subj_id,req.subj_name,req.t_id,req.t_fname];
                await client.query("INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in Class_schedule table";
                }catch(err){
                  ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "internal server error"; 
              return ; 
                }
              });

              // create result data
              router.post('/createresult',async (ctx:Context)=>{
                try{
                let req:result_data=ctx.request.body;
                if(req.result_id===undefined || req.studentid===undefined || req.clas_id===undefined || req.subjectid===undefined || req.marks===undefined){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }

                if(typeof req.result_id!=='number' || typeof req.studentid!=='number' || typeof req.clas_id!=='number' || typeof req.subjectid!=='number' || typeof req.marks!=='number'){
                  ctx.response.status = 400;
                  ctx.response.type = 'text/html';
                  ctx.body = "Bad Request"; 
                  return ;
                }
                await  execute();
               async function execute(){
                const client=await pool.connect();
                await client.query("SET search_path TO College");
                const data = [req.result_id,req.studentid,req.clas_id,req.subjectid,req.marks];
                await client.query("INSERT INTO result values($1,$2,$3,$4,$5)",data); 
                await client.release();
                  }
                  ctx.response.status = 200;
                  ctx.response.type = 'text/html';
                  ctx.body="data is inserted in result table";
                }catch{
                  ctx.response.status = 500;
                  ctx.response.type = 'text/html';
                  ctx.body = "internal server error"; 
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
app.listen(3000,()=>{
    console.log("server is running on port 3000");
 });
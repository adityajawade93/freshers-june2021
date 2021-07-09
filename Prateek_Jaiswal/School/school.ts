const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
const sclient= require("./database");
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


interface student_det{
    roll_num:number;
    fname:string;
    lname:string;
    standard:number;
}

interface stud_marks{
    subcode:number;
    subject:string;
    marks:number;
}

interface topper{
    roll_num:number;
    fname:string;
    marks:number;
}

interface marks_data{
    resultsid:number;
    roll_num:number;
    subcode:number;
    staffid: number;
    standard:number;
    marks:number;
}

router.get('/Teachers',async (ctx:any)=>{
    try{
    let [rows]: Array<{rows: teacher}>=[];
    await  execute();
     async function execute(){
     await sclient.query("SET search_path TO school");
          rows=await sclient.query("SELECT * FROM Teachers"); 
        }
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ;
    }
  });

  router.get('/Subjects',async (ctx:any)=>{
    try{
    let [rows]: Array<{rows: subject}>=[];
    await  execute();
     async function execute(){
      await sclient.query("SET search_path TO school");
          rows=await sclient.query("SELECT * FROM Subjects");
          
        }
        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ;
    }
  });
  router.get('/Students',async (ctx:any)=>{
    try{
      let [rows]: Array<{rows: student}>=[];
      let len:any;
    await  execute();
     async function execute(){
      
       sclient.query("SET search_path TO school");
          rows = await sclient.query("SELECT * FROM Students");
          len = await sclient.query("SELECT Count(*) FROM Students");
          
      }
    
      let page = parseInt(ctx.request.query.page);
      let size= parseInt(ctx.request.query.size);
      let totalPages=Math.ceil((len.rows[0].count)/ size) ;
      if(page===undefined || size===undefined || typeof page!=='number' || typeof size!=='number')
      {
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
  
      const start=page*size;
      const end=Math.min((page+1)*size,len.rows[0].count);
        let req_data=rows.rows;
        req_data=(req_data).slice(start,end);
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body=req_data;
    }catch(err){
          ctx.response.status = 500;
        ctx.response.type = 'text/html';
        ctx.body = "server error"; 
        return ;
      }
  });
  
  router.get('/class',async (ctx:any)=>{
    try{
    let [rows]: Array<{rows: class_schedule}>=[];
    await  execute();
     async function execute(){
      
      await sclient.query("SET search_path TO school");
          rows=await sclient.query("SELECT * FROM Class_schedule"); 
          
        }
        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ;
    }
  });

  // get student using teacherid
  router.get('/Teachers/:id',async (ctx: any)=>{
    try{
      let id: any = ctx.params.id
    if(id===undefined )
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
    let [rows]: Array<{rows: student_det}>=[];
    await  execute();
     async function execute(){
     
      await sclient.query("SET search_path TO school");
          rows=await sclient.query(`SELECT ST.roll_num ,ST.fname,ST.lname,ST.standard 
          FROM Students AS ST INNER JOIN Teachers AS T ON T.subcode=ST.subcode AND T.staffid=${id}`); 
     
        }
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
      ctx.body=rows.rows;
    }catch(err){
      ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "server error"; 
      return ;
    }
    });

      // get student using subjectid
      router.get('/Subjects/:id',async (ctx:any)=>{
        try{
          let id: any = ctx.params.id
        if(id===undefined )
      {
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
      ctx.body ='Bad Request';
      return ;
      }
        let [rows]: Array<{rows: student_det}>=[];
        await  execute();
         async function execute(){
         
          await sclient.query("SET search_path TO school");
              rows=await sclient.query(`SELECT ST.roll_num,ST.fname,ST.lname,ST.standard
              FROM Students AS ST,Subjects AS sub WHERE sub.subcode=${id} AND sub.subcode=ST.subcode`); 
        
            }
            ctx.response.status = 200;
          ctx.response.type = 'application/json';
          ctx.body=rows.rows;
        }catch(err){
          ctx.response.status = 500;
          ctx.response.type = 'text/html';
          ctx.body = "server error"; 
          return ;
        }



        });

        router.get('/marks/:id',async (ctx:any)=>{
            try{
              let id: any = ctx.params.id
            if(id===undefined)
        {
          ctx.response.status = 400;
          ctx.response.type = 'text/html';
        ctx.body ='Bad Request';
        return ;
        }
            let [rows]: Array<{rows: stud_marks}>=[];
            await  execute();
             async function execute(){
             
              await sclient.query("SET search_path TO school");
                  rows=await sclient.query(`SELECT M.subcode,S.subject,M.marks FROM Marks AS M,Subjects AS S WHERE M.roll_num=${id} AND M.subcode=S.subcode`); 
           
                }
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
              ctx.body=rows.rows;
            }catch(err){
              ctx.response.status = 500;
              ctx.response.type = 'text/html';
              ctx.body = "server error"; 
              return ;
            }
            });

             // get topper 
          router.get('/topclass/:c_id/topsubject/:s_id',async (ctx:any)=>{
            try{
              var c_id=ctx.params.c_id;
              var s_id=ctx.params.s_id;
            if(c_id===undefined  || s_id===undefined)
            {
              ctx.response.status = 400;
              ctx.response.type = 'text/html';
            ctx.body ='Bad Request';
            return ;
            }
            let [rows]: Array<{rows: topper}>=[];
            await  execute();
             async function execute(){
             
              await sclient.query("SET search_path TO school");
                  rows=await sclient.query(`SELECT ST.roll_num,ST.fname,S.marks FROM (SELECT * FROM Marks WHERE standard=${c_id} AND subcode=${s_id} ORDER BY marks DESC) 
                            AS S,Students AS ST WHERE S.roll_num=ST.roll_num LIMIT 1`); 
              
                }
                ctx.response.status = 200;
                ctx.response.type = 'application/json';
              ctx.body=rows.rows;
            }catch(err){
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
const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
const passengers=require('./passengers.json');

// var uniq=require('uniqid');
let app=new koa();
let router=new koarouter();
// var task_array=[];
const port=3001;



router.get('/v1/passengers', (ctx, next) => {
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
      const page = parseInt(ctx.request.query.page);
  const size = parseInt(ctx.request.query.size);
  const totalPages=Math.round(passengers.length / size) + 1
     if(typeof page==="number" && typeof size==="number" && page>=0){
       const startid=page*size;
       const endid=Math.min((page+1)*size,passengers.length);
         const req_data=passengers.slice(startid,endid);
       
         const data = {
          totalPassengers: passengers.length,
          totalPages: totalPages,
          data: req_data,
        };

        ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body = data;

     }
     else{
      ctx.response.status = 404;
      ctx.response.type = 'text/html';
      ctx.body = "unable to fetch";
     }
     
  });


  app.use(bodyParser());
  app.use(router.routes());
app.use(async ctx =>{
    
  ctx.response.status = 404;
  ctx.response.type = 'text/html';
ctx.body = 'Not Found1';
});
app.listen(port,()=>{
    console.log("server is running on port "+port);
 });
 
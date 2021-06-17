import { createContext } from "vm";

const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
const passengers:passenger_data[]=require('./passengers.json');

let app=new koa();
let router=new koarouter();

const port:number=3001;
interface passenger_data{
    _id:string;
    name:string;
    trips:number;
    airline:any[];
    __v:string;
}


router.get('/v1/passengers', (ctx:any, next:any) => {
  console.log("Got request =>", {
    method: ctx.request.method,
    path: ctx.request.url,
    body: ctx.request.body,
  });
      const page:number = parseInt(ctx.request.query.page);
  const size :number= parseInt(ctx.request.query.size);
  const totalPages:number=Math.round(passengers.length / size) + 1
     if(typeof page==="number" && typeof size==="number" && page>=0){
       const startid:number=page*size;
       const endid:number=Math.min((page+1)*size,passengers.length);
         const req_data:passenger_data[]=passengers.slice(startid,endid);
       
         const data :{
             totalPassengers:number;
             totalPages:number;
             data:passenger_data[];

         }= {
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
 
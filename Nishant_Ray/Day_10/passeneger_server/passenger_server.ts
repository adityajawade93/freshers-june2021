import { Context } from "vm";

const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
let uniq=require('uniqid');
let passengers=require('./passenger.json');
const fs=require('fs');

let app=new koa();
let router=new koarouter();

const port:number=3001;

interface airline_data{
  id?: string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: number;
}

interface passenger1{
  _id:string;
   name:string;
   trips:number;
   airline: airline_data | airline_data[];
   __v:number;
}

interface passenger2{
   name?:string;
   trips?:number;
   airline?: airline_data | airline_data[];
}

class passenger{
   _id:string;
   name:string;
   trips:number;
   airline: airline_data | airline_data[];
   __v:number;

  constructor(name:string,trips:number,airline:airline_data | airline_data[]){
    this._id=uniq();
    this.name=name;
    this.trips=trips;
    this.airline=airline;
    this.__v=0;
  }
    
}

function findTask(id){
    let i:number = 0;
    for (i = 0; i < passengers.length; i++) {
        if (passengers[i]._id == id)
            break;
    }
    if (i == passengers.length) return -1;
    else return i;

}


router.get('/v1/passengers',(ctx:Context)=>{
    try{
      const page:number = parseInt(ctx.request.query.page);
  const size:number= parseInt(ctx.request.query.size);
  const totalPages:number=Math.ceil(passengers.length / size) ;
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

  const startid:number=page*size;
  const endid:number=Math.min((page+1)*size,passengers.length);
    const req_data:passenger1=passengers.slice(startid,endid);
    ctx.response.status = 200;
     ctx.response.type = 'application/json';
     ctx.body = req_data;
   
       }catch(err){
        ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
    }
});
router.post('/v1/passengers',(ctx) => {
try{
    let data:passenger2=ctx.request.body;
    if(data.name===undefined || data.trips===undefined || data.airline===undefined || typeof data.name!=='string' || typeof data.trips!=='number' || data.name.trim()===""){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "Bad Request"; 
      return ;
    }
    const new_passenger:passenger=new passenger(data.name,data.trips,data.airline);
     passengers=passengers.concat(new_passenger);
     fs.writeFileSync('passenger.json', JSON.stringify(passengers,null,4)); 
     ctx.response.status = 200;
     ctx.response.type = 'text/html';
      ctx.body = "passenger with id " + new_passenger._id + "created successfully"; 
     }catch(err){
       console.log(err);
        ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
      return ;
    }
    
  });

  router.put('/v1/passengers/:id',(ctx)=>{
      try{
    let id:string = ctx.params.id;
    if(id===undefined || typeof id!=='string')
    {
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
    ctx.body ='Bad Request';
    return ;
    }
      let data:passenger2=ctx.request.body;
      let i=findTask(id);
      if (i === -1) {
          ctx.response.status = 404;
          ctx.response.type = 'text/html';
        ctx.body ='Not Found';
        return ;
      }
         
      if(data.name===undefined && data.trips===undefined && data.airline===undefined){
        ctx.response.status = 400;
          ctx.response.type = 'text/html';
        ctx.body ='Bad Request';
        return ;
      }

          if(data.name!==undefined  && typeof data.name==='string' && data.name.trim()!==""){
            passengers[i].name=data.name;
          }
           if(data.trips!==undefined  && typeof data.trips==='number' && data.trips>=0){
            passengers[i].trips=data.trips;
          }
          if(data.airline!==undefined){
            passengers[i].airline=data.airline;
          }


           fs.writeFileSync('passenger.json', JSON.stringify(passengers,null,4));
              ctx.response.status = 200;
      ctx.response.type = 'text/html';
      ctx.body = "passenger with id " +passengers[i]._id + " updated successfully"; 
         
    } catch(err){
        ctx.response.status = 500;
      ctx.response.type = 'text/html';
      ctx.body = "internal server error"; 
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
 module.exports = app;
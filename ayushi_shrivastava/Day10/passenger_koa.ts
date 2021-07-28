const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
let passengers = require('./passengers.json');
let uniq=require('uniqid');

let port: number = 8001;

const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(bodyParser());

interface airline{
  id?: string;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: number;
}

interface passenger{
   id?: string;
   name:string;
   trips:number;
   airline: airline;
   __v:number;
}

class passengerBody implements passenger {
  _id:string;
  name:string;
   trips:number;
   airline: airline;
   __v:number;

 constructor(name:string,trips:number,airline:airline,__v:number){
   this._id=uniq();
   this.name=name;
   this.trips=trips;
   this.airline=airline;
   this.__v=__v;
 }   
}

router.get('/v1/passengers', async(ctx) => {
    const page: number = parseInt(ctx.request.query.page);
    const limit: number = parseInt(ctx.request.query.size);

    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    let results: object = {};

    try {
      results = await passengers.slice(startIndex, endIndex);
      ctx.response.type = 'application/json';
      ctx.response.status = 200;
      ctx.response.body = JSON.stringify(results);
    } catch (e) {
      ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.response.body = 'data not fetched';
    }
});

router.post('/v1/passengers', async(ctx) => {
  try{
    let body:passenger=ctx.request.body;
    if(typeof body.name!=='string' || typeof body.trips!=='number' || body.name.trim()===""){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "The Request is not valid"; 
      return ;
    }
     var passengerRequest = new passengerBody(body.name,body.trips,body.airline,body.__v);
     passengers = passengers.concat(passengerRequest);
     fs.writeFileSync('passengers.json', JSON.stringify(passengers)); 
     ctx.response.status = 200;
     ctx.response.type = 'text/html';
      ctx.body = "passenger named " + passengerRequest.name + " inserted in the database."; 
     }catch(err){
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
        ctx.body = "could not write to the file"; 
        return ;
    }
});

router.put('/v1/passengers', async(ctx) => {
  let flag = 0;
  try{
    // console.log(passengers[i]["data"]._id);
    //console.log(passengers[1]["data"][499]._id);
    let body:passenger=ctx.request.body;
    if(typeof body.id!=='string'|| typeof body.name!=='string' || typeof body.trips!=='number' || body.name.trim()==="" || body.id.trim()===""){
      ctx.response.status = 400;
      ctx.response.type = 'text/html';
      ctx.body = "The Request is not valid"; 
      return ;
    }
    
     let i: number;
     let j:number;
     //console.log(passengers["data"][0]._id);
     for(i=0;i< 18;i++){
       for(j=0;j<500;j++){
     // console.log(passengers[i]["data"][j]._id);
      //console.log(passengers["data"][i]._id);
        if(passengers[i]["data"][j]._id === body.id){
            //console.log(passengers["data"][i]._id);
            console.log(body.id);
            flag=1;
            break;
        }
     }
     if(flag==1){
       break;
     }
    }
    console.log(i);
     if(i===passengers.length){
      ctx.response.status = 404;
      ctx.response.type = 'text/html';
      ctx.body = "The record not found"; 
      return ;
     }else{
     console.log(i);
     console.log(j);
     passengers[i]["data"][j].name = body.name;
     passengers[i]["data"][j].trips = body.trips;
     passengers[i]["data"][j].airline = body.airline;
     passengers[i]["data"][j].__v = body.__v;

     console.log("hii");
     console.log(passengers[i]["data"][j].name);
     console.log(passengers[i]["data"][j].trips);
     console.log(passengers[i]["data"][j].airline);
     console.log(passengers[i]["data"][j].__v);
     }
     
     if(flag==1){
      fs.writeFile("passenger.json", JSON.stringify(passengers), err => {
     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
      });
     ctx.response.status = 200;
     ctx.response.type = 'text/html';
      ctx.body = "passenger having " + body.id + "updated in the database."; 
     }
      
     }catch(err){
        ctx.response.status = 400;
        ctx.response.type = 'text/html';
        ctx.body = "could not update to the file"; 
        return ;
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at port ${port}`);
});

module.exports = app;

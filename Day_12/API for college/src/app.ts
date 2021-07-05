import { Context } from "vm";

const koa=require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

let app=new koa();
let router=require('./routes/routes');

app.use(json());
app.use(bodyParser());

app.use(router.routes());
app.use(async (ctx:Context) =>{
    
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
  ctx.body = 'Not Found';
  });

  module.exports=app;
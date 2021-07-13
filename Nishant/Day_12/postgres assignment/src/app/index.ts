import { Context } from "vm";

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';

const app=new Koa();
import router from '../routes/index';



app.use(json());
app.use(bodyParser());

app.use(router());

app.use(async (ctx:Context) =>{
    
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
  ctx.body = 'Not Found';
  });

  module.exports=app;
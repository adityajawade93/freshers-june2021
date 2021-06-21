// import * as koa from "koa";
const koa =require("koa")
const Router=require("koa-router");
const logger=require("koa-logger");
const json=require("koa-json");

const app=new koa();
const router=new Router();

router.get("/",async(ctx:any,next:any)=>
{
    ctx.body={msg:"hello WOrld"};
    await next();
});

//Middleware
app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3001,()=>{
    console.log("koa started");
})
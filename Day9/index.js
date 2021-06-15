const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const port = 3000;
const router = new koaroute();
const controller = require('./controller');
app.use(json());
app.use(bodyparser());


router.get('/',(ctx)=>{
    ctx.body = "hello";
})
router.get('/v1/passengers',controller.passengers);


app.use(router.routes());

const server = app.listen(port,()=>{

    console.log("server started successfully");
})

module.exports=server;


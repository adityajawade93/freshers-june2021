const koa =  require('koa');
const koarouter = require('@koa/router');

const app= new koa();
const router = new koarouter();

const bodyparser = require('koa-bodyparser');

app.use(bodyparser());

router.get('/',(ctx)=>{
   console.log('hello');
})

app.use(router.routes());
app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})
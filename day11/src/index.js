const koa =  require('koa');
const koarouter = require('@koa/router');

const app= new koa();
const router = new koarouter();

const bodyparser = require('koa-bodyparser');

const client = require("./db");

const studentcontroller= require('./controller/studentcontroller.js')

app.use(bodyparser());

router.get('/',(ctx)=>{
    ctx.body="hello"
})

router.post('/student',studentcontroller.addStudent);
router.get('/student',studentcontroller.getStudent);

app.use(router.routes());

app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})
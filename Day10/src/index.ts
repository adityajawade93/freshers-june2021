const Koa = require('koa');
const app  = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const port = 3000;
const router = new koaroute();
const todoController  = require('./controller');

app.use(json());
app.use(bodyparser());

router.get('/',(ctx : any)=>{
    ctx.body = "hello";
})

router.post('/todo',todoController.createtodo);
router.get('/todo',todoController.gettodo);
router.put('/todo/:id',todoController.updatetodo);
router.delete('/todo/:id',todoController.deletetodo);
router.get('/todo/:id',todoController.gettodobyid);


app.use(router.routes());

app.listen(port,()=>{

    console.log("server started successfully");
})

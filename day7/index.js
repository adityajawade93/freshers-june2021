const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const todoController = require('./todoController');
const port = 3000;
const router = new koaroute();
app.use(json());
app.use(bodyparser());


router.post('/todo',todoController.createtodo);
router.get('/todo',todoController.gettodo);
router.put('/todo/:id',todoController.updatetodo);
router.delete('/todo/:id',todoController.deletetodo);

app.use(router.routes());

const server = app.listen(port,()=>{
   console.log("server is running on port "+port);
   
})

module.exports=server;
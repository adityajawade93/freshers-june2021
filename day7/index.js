const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const todoController = require('./todoController');



router.post('/todo',todoController.createtodo);
router.get('/todo',todoController.gettodo);
router.put('/todo/:id',todoController.updatetodo);
router.delete('/todo/:id',todoController.deletetodo);
router.get('/todo/:id',todoController.gettodobyid);

app.use(router.routes());

const server = app.listen(port,()=>{
   console.log("server is running on port "+port);
   
})

module.exports=server;
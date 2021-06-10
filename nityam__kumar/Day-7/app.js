const {createTask,getTask,updateTask,deleteTask,getTaskById}=require('./routes_and_controller.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json=require('koa-json');
const KoaRouter = require('@koa/router');
const app = new Koa();
const router = new KoaRouter();


app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());





router.get('/todo', (ctx, next) => {
    getTask(ctx);
});

router.get('/todo/:id', (ctx, next) => {
    getTaskById(ctx);
});

router.post('/todo', (ctx, next) => {
    // console.log("fda");
    createTask(ctx);
});

router.put('/todo/:id', (ctx, next) => {
    updateTask(ctx);
});

router.delete('/todo/:id', (ctx, next) => {
    deleteTask(ctx);
});

module.exports=app;
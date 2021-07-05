const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
var uniq=require('uniqid');
let app=new koa();
let router=new koarouter();
var task_array=[];
const port=3001;

class todo {
  constructor(title, completed) {
    this.id = uniq();
    this.date = new Date();
    this.title = title;
    this.completed = completed;
  }
}
let todo_1=new todo('content',false);
task_array.push(todo_1);
let todo_2=new todo('cont',false);
task_array.push(todo_2);

function findTask(id){
    var i = 0;
    for (i = 0; i < task_array.length; i++) {
        if (task_array[i].id == id)
            break;
    }
    if (i == task_array.length) return -1;
    else return i;

}

router.get('/todo', (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.type='application/json';
      ctx.body=JSON.stringify(task_array,null,2);
  });


router.get('/todo/:id',(ctx,next)=>{
    var id=ctx.url.substring(6);
    let i=findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type='text/html';
      ctx.body = {message: "Not Found"};
    }
    else {
        ctx.response.status = 200;
        ctx.response.type='application/json';
    ctx.body=JSON.stringify(task_array[i]);
    }
  });

router.post('/todo',(ctx,next)=>{
    let req=ctx.request;
    if(req.body.title===undefined || req.body.completed===undefined){
      ctx.response.status=404;
      ctx.response.type='text/html';
      ctx.body='not enough details';
    }
    else if(typeof req.body.title!=='string' || typeof req.body.completed!=='boolean' || req.body.title.trim() === ''){
      ctx.response.status=404;
      ctx.response.type='text/html';
      ctx.body='invalid data';
    }else{
    const task = new todo(req.body.title, req.body.completed);
    task_array.push(task);
    
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = task;
    }
   
  });

router.put('/todo/:id',(ctx,next)=>{
  const { id } = ctx.params;
  let req=ctx.request;
    let i=findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
      ctx.body ='something wrong with id';
    }
    else {
      let req=ctx.request;
      if(req.body.title===undefined || req.body.completed===undefined){
        ctx.response.status=404;
        ctx.response.type='text/html';
        ctx.body='not enough details';
      }
      else if(typeof req.body.title!=='string' || typeof req.body.completed!=='boolean' || req.body.title.trim() === ''){
        ctx.response.status=404;
        ctx.response.type='text/html';
        ctx.body='invalid data';
      }else{
      
      task_array[i].title=req.body.title;
      task_array[i].completed=req.body.completed;
      
      ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body = task_array[i];
      }
    }
  });

router.delete('/todo/:id',(ctx,next)=>{
  const { id } = ctx.params;
    let i=findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
      ctx.body = 'Not Found';
    }
    else {
        task_array.splice(i, 1);
        ctx.response.status = 200;
        ctx.response.type = 'text/html';
        ctx.body = 'task deleted';
    }
  });

  app.use(bodyParser());
  app.use(router.routes());
app.use(async ctx =>{
    
  ctx.response.status = 404;
  ctx.response.type = 'text/html';
ctx.body = 'Not Found';
});
app.listen(port,()=>{
    console.log("server is running on port "+port);
 });
 module.exports = app;
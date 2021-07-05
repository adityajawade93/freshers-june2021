const koa=require('koa');
const koarouter=require("@koa/router");
const bodyParser = require('koa-bodyparser');
let uniq=require('uniqid');
let app=new koa();
let router=new koarouter();

const port:number=3001;

interface todo_data{
    id:string;
    date:Date;
    title:string;
    completed:boolean;
}

class todo {
    id:string;
    date:Date;
    title?:string;
    completed?:boolean;
  constructor(title:string, completed:boolean) {
    this.id = uniq();
    this.date = new Date();
    this.title = title;
    this.completed = completed;
  }
}
let task_array:todo[]=[];
let todo_1:todo=new todo('content',false);
task_array.push(todo_1);
let todo_2:todo=new todo('cont',false);
task_array.push(todo_2);

function findTask(id:string){
    let i:number = 0;
    for (i = 0; i < task_array.length; i++) {
        if (task_array[i].id == id)
            break;
    }
    if (i == task_array.length) return -1;
    else return i;

}

router.get('/todo', (ctx:any, next:any) => {
  ctx.response.status = 200;
  ctx.response.type='application/json';
      ctx.body=JSON.stringify(task_array,null,2);
  });


router.get('/todo/:id',(ctx:any, next:any)=>{
    let id:string=ctx.url.substring(6);
    let i:number=findTask(id);
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

router.post('/todo',(ctx:any, next:any)=>{
    let data:todo_data=ctx.request.body;
    if(data.title===undefined || data.completed===undefined){
      ctx.response.status=404;
      ctx.response.type='text/html';
      ctx.body='not enough details';
    }
    else if(typeof data.title!=='string' || typeof data.completed!=='boolean' || data.title.trim() === ''){
      ctx.response.status=404;
      ctx.response.type='text/html';
      ctx.body='invalid data';
    }else{
    const task :todo= new todo(data.title, data.completed);
    task_array.push(task);
    
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.body = task;
    }
   
  });

router.put('/todo/:id',(ctx:any, next:any)=>{
    let id:string=ctx.url.substring(6);
    let i:number=findTask(id);
    if (i === -1) {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
      ctx.body ='something wrong with id';
    }
    else {
      let data:todo_data=ctx.request.body;
      if(data.title===undefined || data.completed===undefined){
        ctx.response.status=404;
        ctx.response.type='text/html';
        ctx.body='not enough details';
      }
      else if(typeof data.title!=='string' || typeof data.completed!=='boolean' || data.title.trim() === ''){
        ctx.response.status=404;
        ctx.response.type='text/html';
        ctx.body='invalid data';
      }else{
      
      task_array[i].title=data.title;
      task_array[i].completed=data.completed;
      
      ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.body = task_array[i];
      }
    }
  });

router.delete('/todo/:id',(ctx:any, next:any)=>{
    let id:string=ctx.url.substring(6);
    let i:number=findTask(id);
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
app.use(async (ctx:any) =>{
    
  ctx.response.status = 404;
  ctx.response.type = 'text/html';
ctx.body = 'Not Found';
});
app.listen(port,()=>{
    console.log("server is running on port "+port);
 });

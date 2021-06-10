const koa = require('koa');
const koarouter = require('@koa/router');
const uuid = require('uniqid');
const bodyparser=require('koa-bodyparser');
const json=require('koa-json');

let app= new koa();
let router = new koarouter();

app.use(bodyparser());
app.use(json());

function todo(title,content,completed){
    this.id=uuid('N');
    this.date=new Date();
    this.title=title;
    this.content=content;
    this.completed=completed
}

let todolist=[];


router.get("/",(ctx)=>{
    ctx.body="welcome";
})

router.get("/todo",(ctx)=>{

    ctx.response.type='application/json';
    ctx.response.status=200;
    ctx.body=JSON.stringify(todolist)
})

router.post("/todo",(ctx)=>{
    try{
        let req=ctx.request;
        if(req.body.title==null){
            ctx.response.status=404;
            ctx.response.type='application/json';
            ctx.body={
                "msg":"title is missing"
            }
            return;
        }
    
    
        let newtodo= new todo(req.body.title,req.body.content,req.body.completed);
        todolist.push(newtodo);
        ctx.response.status=200;
        ctx.body={
            "msg":"todo created"
        }
    }
    catch(e){
        console.log(e);
        ctx.response.status=401;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
    }
})

router.put("/todo/:id",(ctx)=>{
    let id = ctx.params.id;
    let i=0;
    for(i=0;i<todolist.length;i++){
        if(todolist[i].id==id){
            break;
        }
    }
    if(i==todolist.length){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body={
            "msg":"todo not found"
        }
        return;
    }

    if(ctx.request.body.title){
        todolist[i].title=ctx.request.body.title
    }
    if(ctx.request.body.constent){
        todolist[i].content=ctx.request.body.content
    }
    if(ctx.request.body.completed!=null){
        todolist[i].completed=ctx.request.body.completed
    }

    ctx.response.status=200;
    ctx.response.type='application/json';
    ctx.body={
        "msg":"todo updated"
    }
})

router.delete("/todo/:id",(ctx)=>{
    let id = ctx.params.id;
    let i=0;
    for(i=0;i<todolist.length;i++){
        if(todolist[i].id==id){
            break;
        }
    }
    if(i==todolist.length){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body={
            "msg":"todo not found"
        }
        return;
    }

    todolist.splice(i,1);

    ctx.response.status=200;
    ctx.response.type='application/json';
    ctx.body={
        "msg":"todo deleted"
    }
})

app.use(router.routes());
app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})
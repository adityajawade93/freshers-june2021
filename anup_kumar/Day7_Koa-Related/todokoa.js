//importing some library
let fs = require("fs")
let http = require("http")
let url = require("url")
let uniq = require("uniqid")
const koa=require("koa")
const koarouter=require("@koa/router")
var parser=require("koa-bodyparser");
// console.log("imported package");

//creating some tasks


const createTodo = function (info,completed) {
    this.id = uniq();
    this.date = new Date();
    this.info = info;
    this.completed=completed;
}

var todoArr = [{"id": "14x2wt2wvkpw4zbl8",
"date": "2021-06-14T04:48:44.395Z",
"info": "Assingment0",
"completed": true}]

let todo1= new createTodo('Assingment1',true);
let todo2 = new createTodo("Assignment2",true);
let todo3 = new createTodo("Assignment3",false);
todoArr.push(todo1);
todoArr.push(todo2);
todoArr.push(todo3);
console.log(todoArr)
console.log("created some dummy todo");


const findId = function (id) {
    var i = 0;
    for (i = 0; i < todoArr.length; i++) {
        if (todoArr[i].id === id)
            return i;
    }
    return "no";
}

function deleteTodo(uuid){
    todoArr = todoArr.filter(function(obj){
        return obj.id != uuid;
    });
}

function validateId(id){
    if(id.length!==17) return "invalid";
}


let app =new koa()
let router=new koarouter()
app.use(parser())

router.get("/welcome",(ctx,nect)=>{

    ctx.body="welcome the todo app";
    return ;
});

router.get("/todo",(ctx,next)=>
{
    console.log(todoArr);
    ctx.body=todoArr;
    return;
});

router.get("/todo/:id",(ctx,next)=>
{
    id=ctx.params.id;
    var index=validateId(id);
    if(index==="invalid")
    {
        ctx.body="invalid id ";
        return ;
    }
    index=findId(id);
    if(index=="no")
    {
        ctx.body="Given id is not present";
        return ;
    }
    else
    {
        data=todoArr[index];
            ctx.body=data;
            return ;
    }

});

router.post('/todo', (ctx,next) => {
    //if info is empty then return error
    if(ctx.request.body.info=="")
    {
        ctx.body="Info can not be empty";
        return ;
    }
    if(typeof(ctx.request.body.completed)!=="boolean")
    {
        ctx.body="This fild sould be boolean";
        return;
    }
    console.log(typeof(ctx.request.body.completed));
    var newTodo=new createTodo(ctx.request.body.info, ctx.request.body.completed);
    console.log(newTodo);
    todoArr.push(newTodo);
    ctx.body = todoArr;
    return;
})

router.put('/todo/:id', (ctx,next) => {
    id = ctx.params.id;
    console.log(id , ctx.request.body);
    if(validateId(id) === "invalid"){
        ctx.body = "invalid id";
        return;
    }
    index=findId(id);
    if(index == "no"){
        ctx.body = "No Such id is there";
        return;
    }
    else{
        todoArr[index].info=ctx.request.body.info;
        todoArr[index].completed=ctx.request.body.completed
        ctx.body = todoArr;
        return;
    }
})

router.delete('/todo/:id', (ctx,next) => {
    id = ctx.params.id;
    var index = validateId(id);
    if(index === "invalid"){
        ctx.body = "invalid id";
        return;
    }
    index=findId(id);
    console.log(index);
    if(index =="no"){
        ctx.body = "No such id is there";
        return;
    }
    else{
        deleteTodo(id);
        console.log(todoArr);
        ctx.body = todoArr;
        return;
    }
})


app.use(router.routes())
app.use(async ctx=>
    {
        ctx.body="page not found";
    });

app.listen(3001)


module.exports = app;
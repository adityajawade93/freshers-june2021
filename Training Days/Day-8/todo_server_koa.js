const koa = require('koa')
const koarouter = require('@koa/router')
const bodyParser = require('koa-bodyparser');
const {v4 : uuidv4} = require('uuid')

var todo_list = [
    {
        id : "cd3974ea-4447-433c-be74-7c44bca4f91e",
        title : "assignment-1",
        discription : "NodeJS Assignment of TODO List"
    },
    {
        id : "cd3974ea-4447-433c-be74-7c44bca4f91f",
        title : "assignment-1",
        discription : "NodeJS Assignment of File R/W"
    },
]

function getTodo(uuid){
    return todo_list.find( ({ id }) => id === uuid );
}

function getTodoList(){
    return todo_list;
}

function createTodo(title, discription){
    const userId = uuidv4();
    let todo = {
        id : userId,
        title : title,
        discription : discription
    }
    todo_list.push(todo)
}

function updateTodo(index, title, discription){
    // var index = todo_list.findIndex( obj => obj.id == uuid);
    todo_list[index].title = title;
    todo_list[index].discription = discription;
}

function deleteTodo(uuid){
    todo_list = todo_list.filter(function(obj){ 
        return obj.id != uuid; 
    });
    // delete todo_list[id];
}

function isValidId(uuid){
    if( uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) )
        return todo_list.findIndex( obj => obj.id == uuid);
    console.log("invalid id passed")
    return "invalid";        
}

let app = new koa()
let router = new koarouter()

app.use(bodyParser())

router.get('/welcome', (ctx,next) => {
    ctx.body = "Welcome to the server";
    return;
})

router.get('/todo', (ctx,next) => {
    // console.log(ctx);
    data = getTodoList();
    ctx.body = data;
    return;
})

router.get('/todo/:id', (ctx,next) => {
    // console.log(ctx);
    id = ctx.params.id;
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        return;
    }
    else{
        data = getTodo(id);
        ctx.body = data;
        return;
    }
})

router.post('/todo', (ctx,next) => {
    // console.log(ctx.request.body);
    if(!ctx.request.body.title.trim()){
        ctx.body = "Title should not be empty";
        return;
    }
    createTodo(ctx.request.body.title, ctx.request.body.discription);
    data = getTodoList();
    ctx.body = data;
    return;
})

router.put('/todo/:id', (ctx,next) => {
    id = ctx.params.id;
    // console.log(id , ctx.request.body);
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        return;
    }
    else{
        if(!ctx.request.body.title.trim()){
            ctx.body = "Title should not be empty";
            return;
        }
        updateTodo(index, ctx.request.body.title, ctx.request.body.discription);
        data = getTodo(id);
        ctx.body = data;
        return;
    }
})

router.delete('/todo/:id', (ctx,next) => {
    id = ctx.params.id;
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        return;
    }
    else{
        deleteTodo(id);
        data = getTodoList();
        ctx.body = data;
        return;
    }
})

app.use(router.routes())

app.use(async ctx => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
})

app.listen(3001)

module.exports = app;

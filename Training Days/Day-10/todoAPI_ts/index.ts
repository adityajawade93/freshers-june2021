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

function getTodo(uuid: string){
    return todo_list.find( ({ id }) => id === uuid );
}

function getTodoList(){
    return todo_list;
}

function createTodo(title: string, discription: string){
    const userId = uuidv4();
    let todo = {
        id : userId,
        title : title,
        discription : discription
    }
    todo_list.push(todo)
}

function updateTodo(index: number, title: string, discription: string){
    // var index = todo_list.findIndex( obj => obj.id == uuid);
    todo_list[index].title = title;
    todo_list[index].discription = discription;
}

function deleteTodo(uuid: string){
    todo_list = todo_list.filter(function(obj){ 
        return obj.id != uuid; 
    });
    // delete todo_list[id];
}

function isValidId(uuid: string){
    if( uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i) )
        return todo_list.findIndex( obj => obj.id == uuid);
    console.log("invalid id passed")
    return "invalid";        
}

let app = new koa()
let router = new koarouter()

app.use(bodyParser())

router.get('/welcome', (ctx: any,next: any) => {
    ctx.body = "Welcome to the server";
    ctx.response.status = 200;
    return;
})

router.get('/todo', (ctx: any,next: any) => {
    // console.log(ctx);
    var data = getTodoList();
    ctx.body = data;
    return;
})

router.get('/todo/:id', (ctx: any,next: any) => {
    // console.log(ctx);
    var id = ctx.params.id;
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        ctx.response.status = 400;
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        ctx.response.status = 406;
        return;
    }
    else{
        var data = getTodo(id);
        ctx.body = data;
        return;
    }
})

router.post('/todo', (ctx: any,next: any) => {
    // console.log(ctx.request.body);
    if(!ctx.request.body.title.trim()){
        ctx.body = "Title should not be empty";
        ctx.response.status = 406;
        return;
    }
    createTodo(ctx.request.body.title, ctx.request.body.discription);
    var data = getTodoList();
    ctx.body = data;
    ctx.response.status = 200;
    return;
})

router.put('/todo/:id', (ctx: any,next: any) => {
    var id = ctx.params.id;
    // console.log(id , ctx.request.body);
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        ctx.response.status = 400;
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        ctx.response.status = 406;
        return;
    }
    else{
        if(!ctx.request.body.title.trim()){
            ctx.body = "Title should not be empty";
            ctx.response.status = 200;
            return;
        }
        updateTodo(index as number, ctx.request.body.title, ctx.request.body.discription);
        var data = getTodo(id);
        ctx.body = data;
        return;
    }
})

router.delete('/todo/:id', (ctx: any,next: any) => {
    var id = ctx.params.id;
    var index = isValidId(id);
    if(index === "invalid"){
        ctx.body = "invalid id passed";
        ctx.response.status = 400;
        return;
    }
    if(index == -1){
        ctx.body = "given id is not present";
        ctx.response.status = 406;
        return;
    }
    else{
        deleteTodo(id);
        var data = getTodoList();
        ctx.body = data;
        ctx.response.status = 200;
        return;
    }
})

app.use(router.routes())

app.use(async (ctx: any) => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
})

app.listen(3001)

module.exports = app;

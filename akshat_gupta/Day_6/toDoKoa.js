const koa = require('koa')
const router = require('@koa/router')
const bodyParser = require('koa-bodyparser');
const uuid = require('uuid');
let port = 3000;
var toDoList = {};
var len = 0;

let toDoApp = new koa();
let myRouter = new router({
    prefix: '/todo'
});

const reqSuccess = (ctx) => {
    ctx.status = 200;
    ctx.type = 'application/json';
}

myRouter.get('/', (ctx) => {
    console.log("Got request =>", { method: ctx.request.method, path: ctx.request.url, body: ctx.request.body });
    reqSuccess(ctx);
    if(len === 0)
        ctx.body = "No entries to display."
    else
        ctx.body = JSON.stringify(toDoList);
})

myRouter.get('/:id', (ctx) => {
    console.log("Got request =>", { method: ctx.request.method, path: ctx.request.url, body: ctx.request.body });
    let id = ctx.params.id;
    // if(id.length > 8) {
    //     ctx.status = 404;
    //     ctx.body = "Id must be less than 8 chracters."
    // }
    if(toDoList.hasOwnProperty(id)) {
        reqSuccess(ctx);
        ctx.body = JSON.stringify(toDoList[id]);
    }
    else {
        ctx.status = 404;
        ctx.body = "Entry with Id : " + id + " does not exist in database."
    }
})

myRouter.post('/', (ctx) => {
    console.log("Got request =>", { method: ctx.request.method, path: ctx.request.url, body: ctx.request.body });
    let title = ctx.request.body.title;
    let completed = ctx.request.body.completed;
    if(title === undefined || completed === undefined) {
        ctx.status = 404;
        ctx.body = "Not enough details provided."
        return;
    }
    reqSuccess(ctx);
    let id = uuid.v4();
    let date = new Date().toJSON().slice(0,10);
    let newItem = {
        'id': id,
        'createdDate': date,
        'title': title,
        'completed': completed
    }
    toDoList[id.toString()] = newItem;
    len++;
    ctx.body = "Entry added Successfully.";
})

myRouter.put('/:id', (ctx) => {
    console.log("Got request =>", { method: ctx.request.method, path: ctx.request.url, body: ctx.request.body });
    let id = ctx.params.id;
    if(toDoList.hasOwnProperty(id) === false) {
        ctx.status = 404;
        ctx.body = "Entry with Id : " + id + " does not exist in database.";
        return;
    }
    reqSuccess(ctx);
    let title = ctx.request.body.title;
    let completed = ctx.request.body.completed;
    if(title !== undefined)
        toDoList[id.toString()].title = title;
    if(completed !== undefined)
        toDoList[id.toString()].completed = completed;
    ctx.body = "Entry updated Successfully.";
})

myRouter.delete('/:id', (ctx) => {
    console.log("Got request =>", { method: ctx.request.method, path: ctx.request.url, body: ctx.request.body });
    let id = ctx.params.id;
    if(toDoList.hasOwnProperty(id) === false) {
        ctx.status = 404;
        ctx.body = "Entry with Id : " + id + " does not exist in database.";
        return;
    }
    reqSuccess(ctx);
    delete toDoList[id.toString()];
    len--;
    ctx.body = "Entry deleted Successfully.";
})

toDoApp.use(bodyParser());
toDoApp.use(myRouter.routes())
toDoApp.use(async ctx => {
    ctx.status = 404;
    ctx.body = "Page not found!";
})

toDoApp.listen(port, () => {
    console.log("Server started at",port);
});

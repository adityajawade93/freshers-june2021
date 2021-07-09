// JavaScript source code

const koa = require('koa')
const koarouter = require('@koa/router')
const fs = require('fs')
const uniqid = require('uniqid')
const bodyparser = require('koa-bodyparser')

var app = new koa();
var router = new koarouter();

router.get('/todo', (ctx: any, next: any) => {
    console.log('ok')
    ctx.body = JSON.stringify(todolist, null, 2)
})
app.use(bodyparser())
app.use(router.routes())
app.use(async (ctx) => {
    ctx.body = 'hello there'
})
app.listen(3001);
console.log("application is now running on port 3000");
var todolist = []
class todo {
    id: string
    date: Date
    todotask: string
    status: any
    constructor(todotask:string, completed:any) {
        this.id = uniqid()
        this.date = new Date()
        this.todotask = todotask
        this.status = status
    }

}


var task :todo = new todo('do the assignment', false)
var task01: todo = new todo('play video games', false)
todolist.push(task)
todolist.push(task01)


router.get('/todo/:id', (ctx: any, next: any) => {
    let id: string = ctx.params.id

    if (id.trim().length == 0 || id.trim().length != 15) {
        ctx.body = 'error in assigning id';
        return;
    }

    let i: number;
    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id == id) {
            ctx.body = JSON.stringify(todolist[i], null, 2)
        }
    }
})

router.post('/todo', (ctx: any, next: any) => {

    let reqtask: string = ctx.request.body.todowork
    let reqcomplete: boolean = ctx.request.body.status

    if (reqtask === null || typeof reqtask != 'string' || typeof reqcomplete != 'boolean') {
        ctx.body = 'assign id properly'
        return
    } else {
        let task = new todo(reqtask, reqcomplete)
        todolist.push(task)
        ctx.body = task
    }

})

router.put('/todo/:id', (ctx: any, next: any) => {
    let id: string = ctx.params.id
    console.log(typeof id + "  " + id.length)

    if (id.trim().length == 0 || id.trim().length != 15) {
        ctx.body = 'error in assigning id'
        return
    }

    let i: number ;
    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id === id) {
            let reqtask: string = ctx.request.body.todowork
            let reqcomplete: boolean = ctx.request.body.status

            if (reqtask === null || typeof reqtask != 'string' || typeof reqcomplete != 'boolean') {
                ctx.body = 'please give a proper task'
                return
            } else if (reqtask.trim().length == 0) {
                ctx.body = 'please give a proper task'
                return

            } else {
                todolist[i].todowork = reqtask
                todolist[i].status = reqcomplete
            }

            break
        }
    }

    if (i == todolist.length) {
        ctx.body = 'task not found/error-404'
    } else {
        ctx.body = todolist[i]
    }

})

router.delete('/todo/:id', (ctx: any, next: any) => {

    let id: string = ctx.params.id

    if (id.trim().length == 0 || id.trim().length != 15) {
        ctx.body = 'error in assigning id'
        return
    }

    let todolength: number = todolist.length
    let i: number;

    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id === id) {
            todolist.splice(i, 1)
            break
        }
    }

    if (todolist.length == todolength) {
        ctx.body = 'task not found/error-404'
    } else {
        ctx.body = 'task deleted successfully'
    }
})


module.exports = (app);



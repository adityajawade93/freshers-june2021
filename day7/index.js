const koa = require('koa')
const koarouter = require('@koa/router')
const fs = require('fs')
const uniqid = require('uniqid')
const bodyparser = require('koa-bodyparser')

var app = new koa();
var router = new koarouter();

var todomap = new Map()

function todo(todotask, completed) {
    this.id = uniqid()
    this.date = new Date()
    this.todotask= todotask
    this.completed =completed
}

var task1 = new todo('read a book',false)
var task2 = new todo('watch movie',false)

todomap.set(task1.id,task1)
todomap.set(task2.id,task2)

router.get('/todo', (ctx,next) =>{
    console.log('got here')

    const obj = Object.fromEntries(todomap)
    ctx.body = JSON.stringify(obj,null,2)
})

router.get('/todo/:id', (ctx,next) =>{
    let id = ctx.params.id

    if(id.trim().length ==0||id.trim().length !=15){
        ctx.body = 'id is not given properly please give a proper id '
        return
    }

    if(todomap.has(id)){
        const obj = todomap.get(id)
        ctx.body = JSON.stringify(obj,null,2)
    }else{
        ctx.body = 'error,id not found'
    }
})

router.post('/todo' , (ctx ,next) =>{

    let reqtask =  ctx.request.body.todotask
    let reqcomplete = ctx.request.body.completed

    if(reqtask ===null|| typeof reqtask != 'string'||typeof reqcomplete != 'boolean'){
        ctx.body = 'please give a proper task'
        return
    }else{
        let task = new todo(reqtask,reqcomplete)
        todomap.set(task.id,task)
        ctx.body = task
    }
    
})

router.put('/todo/:id',(ctx,next) =>{
    let id = ctx.params.id
    console.log(typeof id+"  "+id.length)

    if(id.trim().length ==0||id.trim().length !=15){
        ctx.body = 'id is not given properly please give a proper id '
        return
    }

    if(todomap.has(id)){
        let reqtask =  ctx.request.body.todotask
        let reqcomplete = ctx.request.body.completed

        if(reqtask ===null|| typeof reqtask != 'string'||typeof reqcomplete != 'boolean'){
            ctx.body = 'please give a proper task'
            return
        }else if(reqtask.trim().length ==0){
            ctx.body = 'please give a proper task'
            return

        }else{
            let task =todomap.get(id)
            task.todotask = reqtask
            task.completed=reqcomplete
            todomap.set(id,task)
            ctx.body = task
            
        }
        
    }else{
        ctx.body ='404,task not found'
    }
})

router.delete('/todo/:id',(ctx,next) =>{

    let id = ctx.params.id

    if(id.trim().length ==0||id.trim().length !=15){
        ctx.body = 'id is not given properly please give a proper id '
        return
    }

    let maplength = todomap.size

    if(todomap.has(id)){
        todomap.delete(id)
    }else{
        ctx.body ='404,task not found'
        return
    }
    if(todomap.size==maplength){
        ctx.body ='404,task not deleted'
    }else{
        ctx.body ='task deleted successfully'
    }
})

app.use(bodyparser())
app.use(router.routes())
app.use(async (ctx) =>{
    ctx.body = 'hi i am sujit'
})
app.listen(3001)


module.exports =  app 




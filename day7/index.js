const koa = require('koa')
const koarouter = require('@koa/router')
const fs = require('fs')
const uniqid = require('uniqid')
const bodyparser = require('koa-bodyparser')

var app = new koa();
var router = new koarouter();

var todolist =[]

function todo(todotask, completed) {
    this.id = uniqid()
    this.date = new Date()
    this.todotask= todotask
    this.completed =completed
}

var task1 = new todo('read a book',false)
var task2 = new todo('watch movie',false)
todolist.push(task1)
todolist.push(task2)
router.get('/todo', (ctx,next) =>{
    console.log('got here')
    ctx.body = JSON.stringify(todolist,null,2)
})

router.get('/todo/:id', (ctx,next) =>{
    let id = ctx.params.id

    if(id.trim().length ==0||id.trim().length !=15){
        ctx.body = 'id is not given properly please give a proper id '
        return
    }

    let i 
    for(i =0;i<todolist.length;i++){
        if(todolist[i].id == id){
            ctx.body = JSON.stringify(todolist[i],null,2)
        }
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
        todolist.push(task)
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

    let i 
    for(i =0;i<todolist.length;i++){
        if(todolist[i].id===id){
            let reqtask =  ctx.request.body.todotask
            let reqcomplete = ctx.request.body.completed

            if(reqtask ===null|| typeof reqtask != 'string'||typeof reqcomplete != 'boolean'){
                ctx.body = 'please give a proper task'
                return
            }else if(reqtask.trim().length ==0){
                ctx.body = 'please give a proper task'
                return

            }else{
                todolist[i].todotask = reqtask
                todolist[i].completed =reqcomplete
            }
            
            break
        }
    }

    if(i==todolist.length){
        ctx.body ='404,task not found'
    }else{
        ctx.body =todolist[i]
    }

})

router.delete('/todo/:id',(ctx,next) =>{

    let id = ctx.params.id

    if(id.trim().length ==0||id.trim().length !=15){
        ctx.body = 'id is not given properly please give a proper id '
        return
    }

    let todolength =todolist.length
    let i;

    for(i=0;i<todolist.length;i++){
        if(todolist[i].id===id){
            todolist.splice(i,1)
            break
        }
    }

    if(todolist.length==todolength){
        ctx.body ='404,task not found'
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




const http =require('http')
const fs = require('fs')
const url = require('url')
const uniqid = require('uniqid')

var todolist =[]
function todo(todotask,taskstatus){
    this.id = uniqid()
    this.date = new Date()
    this.todotask=todotask
    this.taskstatus=taskstatus
}
const port =8080

let todo1 = new todo('read a book',false)
todolist.push(todo1)

var server = http.createServer((req,res) =>{
    if(req.method ==='GET'){
        handlerequest(req,res)
    }else{
        attachbodytorequest(req,res,handlerequest)
    }

})
.listen(port,() =>{
    console.log('server started at' ,port)
})



var handlerequest =(req,res) =>{

    console.log("got request ==>" ,{
        method: req.method,
        path: req.url,
        contenttype:req.headers['content-type'],
        body:req.body
    })

    if(req.method==='GET'&& req.url ==='/gettask'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify(todolist,null,2))

    }else if(req.method==='POST' && req.url ==='/posttask'){
        let task = new todo(req.body.todotask,req.body.taskstatus)
        todolist.push(task);
        console.log(task)
        res.writeHead(200,{'content-type':'text/html'})
        res.write('task added to the todo list')
        res.end()
    }else if(req.method==='PUT' && req.url ==='/puttask'){
        let id = req.body.id
        let i
        for(i =0;i<todolist.length;i++){
            if(todolist[i].id===id){
                todolist[i].todotask = req.body.todotask
                todolist[i].taskstatus =req.body.taskstatus
                break;
            }
        }
        if(i==todolist.length){
            res.writeHead(402,{'content-type':'text/html'})
            res.write('<h1>task not found</h1>')
            res.end()
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.write('task updated successfully')
            res.end()
        }

    }else if(req.method==='DELETE' && req.url ==='/deletetask'){
        let id = req.body.id
        let l =todolist.length
        let i;

        for(i=0;i<todolist.length;i++){
            if(todolist[i].id===id){
                todolist.splice(i,1)
                break
            }
        }

        if(todolist.length==l){
            res.writeHead(402,{'content-type':'text/html'})
            res.write('task not found')
            res.end()
        }else{
            res.writeHead(402,{'content-type':'text/html'})
            res.write('task deleted successfully')
            res.end()
        }
    }else{
        res.writeHead(404,{'content-type':'text/html'})
        res.write('page not found')
        res.end()
    }
} 

var attachbodytorequest = (req,res,callback) =>{
    let body =''

    req.on('data' ,(data) =>{
        body +=data
    })
    req.on('end',() =>{
        
        if(req.headers['content-type']==='application/json'){
            req.body = JSON.parse(body)
        }else{
            console.log('requested data is of other mime types')
        }
        callback(req,res)
    })
    
}
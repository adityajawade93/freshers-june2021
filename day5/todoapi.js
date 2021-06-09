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
const port =8001

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

    if(req.method==='GET'&& req.url ==='/todo'){
        gettodo(req,res)

    }else if(req.method==='GET'&& req.url.match("/todo/+")){
        let id = req.url.substring(6)
        gettodobyid(req,res,id)

    }else if(req.method==='POST' && req.url ==='/todo'){
        createtodo(req,res)
        
    }else if(req.method==='PUT' && req.url.match("/todo/+").length>0){
        let id = req.url.substring(6)
        //console.log(req.url,id)
        updatetodo(req,res,id)
        

    }else if(req.method==='DELETE' && req.url.match("/todo/+").length>0){
        let id = req.url.substring(6)
        deletetodo(req,res,id)
        
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

var gettodo = (req,res) =>{

    res.writeHead(200,{'content-type':'application/json'})
    res.end(JSON.stringify(todolist,null,2))
}

var gettodobyid = (req,res,id) =>{
    let i
    for(i =0;i<todolist.length;i++){
        if(todolist[i].id === id){
            res.writeHead(200,{'content-type':'application/json'})
            res.end(JSON.stringify(todolist[i],null,2))
            break
        }
    }
    if(i==todolist.length){
        res.writeHead(404,{'content-type':'text/html'})
        res.write('task not found')
        res.end()
    }
}


var createtodo = (req,res) =>{
    let task = new todo(req.body.todotask,req.body.taskstatus)
        todolist.push(task);
        console.log(task)
        res.writeHead(200,{'content-type':'text/html'})
        res.write('task created to the todo list')
        res.end()
}

var updatetodo = (req,res,id) =>{
    let i
        for(i =0;i<todolist.length;i++){
            if(todolist[i].id===id){
                todolist[i].todotask = req.body.todotask
                todolist[i].taskstatus =req.body.taskstatus
                break;
            }
        }
        if(i==todolist.length){
            res.writeHead(404,{'content-type':'text/html'})
            res.write('task not found')
            res.end()
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.write('task updated successfully')
            res.end()
        }
}

var deletetodo = (req,res,id) =>{

        let todolength =todolist.length
        let i;

        for(i=0;i<todolist.length;i++){
            if(todolist[i].id===id){
                todolist.splice(i,1)
                break
            }
        }

        if(todolist.length==todolength){
            res.writeHead(404,{'content-type':'text/html'})
            res.write('task not found')
            res.end()
        }else{
            res.writeHead(200,{'content-type':'text/html'})
            res.write('task deleted successfully')
            res.end()
        }

}


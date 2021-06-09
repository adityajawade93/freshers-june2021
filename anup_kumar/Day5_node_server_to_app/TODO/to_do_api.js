//importing some library
let fs = require("fs")
let http = require("http")
let url = require("url")
let uniq = require("uniqid")
let port = 3001

//creating some tasks
var todoArr = []

const createTodo = function (info,completed) {
    this.id = uniq();
    this.date = new Date();
    this.info = info;
    this.completed=completed;
}

let todo1= new createTodo('Assingment1',true);
let todo2 = new createTodo("Assignment2",true);
let todo3 = new createTodo("Assignment3",true);
todoArr.push(todo1);
todoArr.push(todo2);
todoArr.push(todo3);
console.log(todoArr)

//finding task by id
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
    // delete todo_list[id];
}

// //Starting the server at port 3001

http.createServer((req, res) =>
{
    if(req.method==="GET" || req.method==="POST" || req.method==="DELETE" || req.method==="PUT"){
        handleRequest(req,res);
    }
    else{
        console.log("Error occured");
        res.writeHead(404);
        res.end("bad request");
    }
}).listen(port, () => {
    console.log("server started at port", port);
});



let handleRequest = (req, res) => {
    //print the data
    
    console.log("Got request =>", {
        method: req.method,
        path: req.url,
        contentType: req.headers['content-type'],
        body: req.body
    });
    

    //Get method
    if(req.method==="GET")
    {

        if (req.url==="/todo")
        {
            res.writeHead(200);//ok status
            res.end(JSON.stringify(todoArr));//response
        }
        else if (req.url.match(/\/todo\/.+/))
        {
            var id=req.url.substring(6);
            console.log(req.url,id);
            if(id==="")
            {
                // console.log("In empty",id);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end("No Id provided");         
            }
            else
            {
                let index = findId(id);
                if (index ==="no") 
                {
                    res.writeHead(404);//status
                    res.write('todo Not Found');
                    res.end();
                }
                else
                {
                    res.writeHead(200);
                    res.end(JSON.stringify(todoArr[index]));
                }
            }
        }
    }

    //Post method

    else if (req.method==="POST" && req.url==="/todo" && req.headers['content-type'] === 'application/json')
    {
        body = '';
        req.on('data', (data) =>
        {
            body += data;
            console.log(body);
        });
        
        req.on("end", _any => {
            if (req.headers['content-type'] === 'application/json') {
                req.body = JSON.parse(body);
            } else {
                console.log('Request Body of other mime types');
            }
            console.log(req.body);
            let newTodo= new createTodo(req.body.info, req.body.completed);
            todoArr.push(newTodo);
            res.writeHead(200); // set status code
            return res.end(JSON.stringify(todoArr))
        });
    }

    //put method
    else if (req.method==="PUT" && req.url.match(/\/todo\/.+/)  && req.headers['content-type'] === 'application/json')
    {
        var id=req.url.substring(6);
        
        if(id===null)
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No Id");  
            res.end();
        }
        else
            {
                let index=findId(id);
                if(index==="no")
                {
                    res.writeHead(404);
                    res.write('This todo not found');
                    res.end();
                }
                else 
                {
                    body = '';
                    req.on('data', (data) =>
                    {
                    body += data;
                    console.log(body);
                    });
                
                req.on("end", _any => {
                    if (req.headers['content-type'] === 'application/json') {
                        req.body = JSON.parse(body);
                    } else {
                        console.log('Request Body of other mime types');
                    }
                    console.log(req.body);
                    todoArr[index].info=req.body.info;
                    todoArr[index].completed=req.body.completed
                    res.writeHead(200); // set status code
                    return res.end(JSON.stringify(todoArr[index]))
                 });
                }
            }
               
    }
     
    //delete method
    else if(req.method==="DELETE" && req.url.match(/\/todo\/.+/))
    {
        var id=req.url.substring(6);
        if(id==="")
        {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No Id given");
            res.end();
        }
        else 
        {
                if(findId(id)==="no")
                {
                    res.writeHead(404);
                    res.write('no such id found');
                    res.end();
                }
                else 
                {
                    deleteTodo(id);
                    res.writeHead(200); // set status code
                    console.log(todoArr);
                    return res.end("deleted successfully");
                }
        }
    }

}


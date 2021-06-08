let http = require('http');
let url = require('url');
const port = 3001;
const {v4 : uuidv4} = require('uuid')

// var id_count = 1;
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
];

function getTodo(uuid){
    return todo_list.find( ({ id }) => id === uuid );
}

function getTodoList(){
    return todo_list;
}

function createTodo(title, discription){
    // id_count++;
    const userId = uuidv4();
    let todo = {
        id : userId,
        title : title,
        discription : discription
    }
    todo_list.push(todo);
}

function updateTodo(uuid, title, discription){
    var index = todo_list.findIndex( obj => obj.id == uuid);
    todo_list[index].title = title;
    todo_list[index].discription = discription;
}

function deleteTodo(uuid){
    todo_list = todo_list.filter(function(obj){ 
        return obj.id != uuid; 
    });
    // delete todo_list[id];
}


http.createServer((req,res) => {
    if (req.method === 'GET') {
        return handleGetReq(req, res)
    } else if (req.url === '/todo' && req.method === 'POST') {
        return handlePostReq(req, res)
    } else if (req.method === 'DELETE') {
        return handleDeleteReq(req, res)
    } else if (req.method === 'PUT') {
        return handlePutReq(req, res)
    }
    else{
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})
.listen(port, () => {
    console.log("server started at port", port);
});

let handleGetReq = (req,res) => {
    console.log("Get Request");
    console.log(url.parse(req.url,true));
    if(req.url === '/'){
        res.writeHead(200); // set status code
        res.end("Welcome to TODO List App" + id_count);
    }
    if(req.url === '/todo'){
        console.log(url.parse(req.url,true));
        data = getTodoList();
        res.writeHead(200); // set status code
        return res.end(JSON.stringify(data))
    }
    if(req.url.match(/\/todo\/.+/)){
        var id=req.url.substring(6);
        console.log(req.url,id);
        data = getTodo(id);
        res.writeHead(200); // set status code
        return res.end(JSON.stringify(data));
    }
    return handleError(res,404);
}

let handlePostReq = (req,res) => {
    console.log("Post Request");
    console.log(url.parse(req.url,true));
    body = '';
    req.on('data', (data) => {
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
        createTodo(req.body.title, req.body.discription);
        data = getTodoList();
        res.writeHead(200); // set status code
        return res.end(JSON.stringify(data))
    });
}

let handleDeleteReq = (req, res) => {
    console.log("Delete Request");
    console.log(url.parse(req.url,true));
    if(req.url.match(/\/todo\/.+/)){
        var id=req.url.substring(6);
        console.log(req.url,id);
        deleteTodo(id);
        data = getTodoList();
        res.writeHead(200); // set status code
        return res.end(JSON.stringify(data))
    }
    return handleError(res,404);
}

let  handlePutReq = (req, res) => {
    console.log("Put Request");
    console.log(url.parse(req.url,true));
    body = '';
    if(req.url.match(/\/todo\/.+/)){
        var id=req.url.substring(6);
        console.log(req.url,id);
        req.on('data', (data) => {
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
            updateTodo(id, req.body.title, req.body.discription);
            data = getTodo(id);
            res.writeHead(200); // set status code
            return res.end(JSON.stringify(data))
        });
    }
    return handleError(res,404);
}

let handleError = (res, code) => {
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 
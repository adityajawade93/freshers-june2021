const http = require('http');
const uuid = require('uniqid'); 
const port = 8000;

class Todo{
    constructor(id, date, title, completed){
        this.id = id;
        this.createdDate = date;
        this.title = title;
        this.completed = completed
    }
}

const todoList = [];
let todo = new Todo(uuid(),Date.now(),'chess',false);
todoList.push(todo);
todo = new Todo(uuid(),Date.now(),'carrom'.true);
todoList.push(todo);

http.createServer((request,response) => {
    if(request.method === 'POST' && request.url === '/todo'){
        let body = [];
        request.on('error',(err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            todoList.concat(body);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end("POST request is successful!!");
        })
    }
    else if(request.method === 'GET' && request.url == '/todo'){
        response.on('error', (err) => {
            console.error(err.stack);
        });
        response.end(JSON.stringify(todoList));
    }
    else if(request.method === 'GET' && request.url.match(/\/todo\/.+/)){
        let id = url.match(/\d+/g);
        id = parseInt(id);
        let obj;
        for(let i = 0;i < todoList.length; i++){
            if(todoList[i].id == id){
                obj = todoList[i];
                break;
            }
        }
        response.end(JSON.stringify(obj));
        response.on('error', (err) => {
            console.error(err.stack);
        }).on('finish', () => {
            console.log("Writing to response stream completed");
        })
    }
    else if(request.method === 'PUT' && request.url.match(/\/todo\/.+/)){

        let id = url.match(/\d+/g);
        id = parseInt(id);
        let index;

        for(let i = 0;i < todoList.length; i++){
            if(todoList[i].id == id){
                index = i;
                break;
            }
        }
        let body = [];
        request.on('error',(err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            todoList[index].id = body.id;
            todoList[index].createdDate = body.date;
            todoList[index].title = body.title;
            todoList[index].completed = body.completed;

            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.write(JSON.stringify(body));
            response.end("PUT request is successful!!");
        })
    }
    else if(request.method === 'DELETE' && request.url.match(/\/todo\/.+/)){
        let id = url.match(/\d+/g);
        id = parseInt(id);
        let index;

        for(let i = 0;i < todoList.length; i++){
            if(todoList[i].id == id){
                index = i;
                break;
            }
        }
        todoList.splice(index,1);
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end("DELETE request is successful!!");
    }
}).listen(port,() =>{
    console.log(`The server is running at port ${port}`)
});

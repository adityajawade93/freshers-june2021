let http = require('http');
var fs = require('fs');
var url=require('url');
var uniq=require('uniqid');
const port = 3001;

var task_array=[]

function todo(title,status)
{
    this.id = uniq();
    this.date = new Date();
    this.title = title;
    this.status = status;
}
let todo_1=new todo('content',false);
task_array.push(todo_1);
let todo_2=new todo('cont',false);
task_array.push(todo_2);
http.createServer((req, res) => { // all request will have req, res
    if (req.method === 'GET') {
        handleRequest(req, res);
    } else {
        attachBodyToRequest(req, res, handleRequest)
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

let handleRequest = (req, res) => {
    console.log("Got request =>", { method: req.method, path: req.url, contentType: req.headers['content-type'], body: req.body });
    if(req.method === 'GET' && req.url==='/getdata')
  {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(task_array, null, 2));
  }
   else if (req.method === 'POST' && req.url==='/post') {
    let task = new todo(req.body.title,req.body.status)
    task_array.push(task);
    console.log(task)
    res.writeHead(200,{'content-type':'text/html'})
    res.write('task added')
    res.end()
    } else if ( req.method === "PUT" && req.url ==='/updatetask' ) {
        let id=req.body.id;
        for(let i=0;i<task_array;i++){
            if(task_array[i].id===id)
            {
                if(i===task_array.length)
                {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found');
            res.end();
                }else{
                task_array[i].title = req.body.title;
            task_array[i].status = req.body.status;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Updated');
            res.end();
            }

            break;
        }
        }
    } else if(req.method === "DELETE" && req.url ==='/deletetask'){
        let id=req.body.id;
        for(let i=0;i<task_array;i++){
            if(task_array[i].id===id)
            {
                if(i===task_array.length)
                {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found');
            res.end();
                }else{
                    todolist.splice(i,1);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('deleted');
            res.end();
            }

            break;
        }
        }
    }else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Not Found2</h2>');
        res.end();
    }
}

let attachBodyToRequest = (req, res, callback) => {
    let body = '';
    //let count = 0;
    req.on('data', (data) => {
      //  count++;
      //  console.log('count', count);
        body += data;
    });
    req.on("end", _any => {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body);
        } else {
            console.log('Request Body of other mime types');
        }
        callback(req, res);
    });
}


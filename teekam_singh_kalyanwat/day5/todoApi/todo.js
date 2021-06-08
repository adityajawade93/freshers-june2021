let http = require('http');
var fs = require('fs');
const uuid = require('uniqid');

const port = 3001;

var task_list =[]

function task(title,status){
    this.id = uuid();
    this.date = new Date();
    this.title=title;
    this.status=status;
}

let first_task = new task('send docs',false);
task_list.push(first_task);

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

    if(req.method === 'Post' && req.url === '/todo'){

        let new_task = new task(req.body.title, req.body.status);
        task_list.push(new_task);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Task succesfully added');
        res.end();

    }
    else if(req.method === 'GET' && req.url === '/todo'){

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task_list, null, 2));

    }
    else if(req.method === 'GET' && req.url === '/todo/:id'){

        let req_id = req.body.id;
        var len = task_list.length;
        var i=0;
        for(i=0;i<len;i++){
            if(task_list[i].id === req_id) break;
        }

        if(i == len){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Task doesnt exist');
            res.end();
        }
        else{
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(JSON.stringify(task_list[i]));
        }
    }
    else if(req.method === 'PUT' && req.url === '/todo/:id'){
        let req_id = req.body.id;
        var len = task_list.length;
        var i=0;
        for(i=0;i<len;i++){
            if(task_list[i].id === req_id){
                task_list[i].title = req.body.title;
                task_list[i].status = req.body.status;
                break;
            }
        }

        if(i == len){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Task doesnt exist');
            res.end();
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Task updated successfully');
            res.end();
        }
    }
    else if(req.method === 'DELETE' && req.url === '/todo/:id'){
        let req_id = req.body.id;
        var len = task_list.length;
        var i=0;
        for(i=0;i<len;i++){
            if(task_list[i].id === req_id){
                break;
            }
        }

        if (i == len) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Task doesnt exist');
            res.end();
        }
        else {
            task_list.splice(i, 1);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Task deleted');
            res.end();
        }

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Page Not Found</h2>');
        res.end();
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
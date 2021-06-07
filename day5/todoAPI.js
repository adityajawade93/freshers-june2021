let http = require('http');

const uuid = require('uniqid');

const port = 3001;
var taskList = []

function Task(title, content, completed) {
    this.id = uuid();
    this.date = new Date();
    this.title = title;
    this.content = content;
    this.completed = completed;
}

let task1= new Task('maths','algebra',false);
taskList.push(task1);

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
    if (req.method === 'POST' && req.url === '/createtask') {

        let task = new Task(req.body.title, req.body.content, req.body.completed);
        taskList.push(task);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Notes Created');
        res.end();

    } else if (req.method === 'GET' && req.url === '/readtask') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(taskList, null, 2));


    } else if (req.method === 'PUT' && req.url === '/updatetask') {
       
        let id = req.body.id;
        var i = 0;
        for (i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id)
                break;
        }
        if (i == taskList.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();
        }
        else {
            if (req.body.title)
                taskList[i].title = req.body.title;
            if (req.body.content)
                taskList[i].content = req.body.content;
            taskList[i].completed = req.body.completed;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Notes Updated');
            res.end();
        }

    } else if (req.method === 'DELETE' && req.url === '/deletetask') {

        let id = req.body.id;
        var i = 0;
        for (i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id)
                break;
        }
        if (i == taskList.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();
        }
        else {
            taskList.splice(i, 1);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Notes deleted');
            res.end();
        }

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Not Found2</h2>');
        res.end();
    }
}

let attachBodyToRequest = (req, res, callback) => {
    let body = '';

    req.on('data', (data) => {
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


    




// CRUD for todo
// api to create todo , url /todo, method post
//  {
// id: unique id, Date.now(); uuid()
// createdDate
// title
// completed
// }
// api to update todo, url /todo/:id, method put
// api to list youll get all  todo, url /todo, method get
// api to read todo here you send id, url /todo/:id, method get
// api to delete todo, url /todo/:id, method delete
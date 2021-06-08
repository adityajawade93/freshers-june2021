let http = require('http');

const uuid = require('uniqid');

const port = 4000;

var apiArray = []

function Task(title, content, completed) {
    this.id = uuid();
    this.date = new Date();
    this.title = title;
    this.content = content;
    this.completed = completed;
}

let task1= new Task('maths','algebra',false);
apiArray.push(task1);

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
    console.log("Got request =>", { 
        method: req.method, 
        path: req.url, 
        contentType: req.headers['Content-type'],
         body: req.body
        });

    if (req.method === 'POST' && req.url === '/posttodo') {

        let task = new Task(req.body.title , req.body.content, req.body.completed);
        apiArray.push(task);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Notes Created');
        res.end();

    } else if (req.method === 'GET' && req.url === '/gettodo') {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiArray, null, 2));


    } else if (req.method === 'PUT' && req.url === '/puttodo') {
       
        let id = req.body.id;
        var i = 0;
        for (i = 0; i < apiArray.length; i++) {
            if (apiArray[i].id == id)
                break;
        }
        if (i == apiArray.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();
        }
        else {
            if (req.body.title)
                apiArray[i].title = req.body.title;
            if (req.body.content)
                apiArray[i].content = req.body.content;
            apiArray[i].completed = req.body.completed;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Notes Updated');
            res.end();
        }

    } else if (req.method === 'DELETE' && req.url === '/deltodo') {

        let id = req.body.id;
        var i = 0;
        for (i = 0; i < taskList.length; i++) {
            if (apiArray[i].id == id)
                break;
        }
        if (i == apiArray.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();
        }
        else {
            apiArray.splice(i, 1);
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


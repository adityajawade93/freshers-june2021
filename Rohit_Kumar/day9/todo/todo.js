var http = require('http');
var uuid = require('uniqid');
var port = 4001;
var apiArray = [];
function Task(title, content, completed) {
    this.id = uuid();
    this.date = new Date();
    this.title = title;
    this.content = content;
    this.completed = completed;
}
var task1 = new Task('maths', 'algebra', false);
apiArray.push(task1);
var task2 = new Task('Physics', 'Mechanics', true);
apiArray.push(task2);
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        handleRequest(req, res);
    }
    else {
        attachBodyToRequest(req, res, handleRequest);
    }
}).listen(port, function () {
    console.log("server started at port", port);
});
function getId(id) {
    var i = 0;
    for (i = 0; i < apiArray.length; i++) {
        if (apiArray[i].id == id)
            break;
    }
    if (i == apiArray.length)
        return -1;
    else
        return i;
}
var handleRequest = function (req, res) {
    console.log("Got request =>", {
        method: req.method,
        path: req.url,
        contentType: req.headers['Content-type'],
        body: req.body
    });
    if (req.method === 'GET' && req.url === '/todo') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiArray, null, 2));
    }
    else if (req.method === 'POST' && req.url === '/todo') {
        var task = new Task(req.body.title, req.body.content, req.body.completed);
        apiArray.push(task);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Notes Created');
        res.end();
    }
    else if (req.method === 'GET' && req.url.match(/\/todo\/.+/)) {
        var id = req.url.substring(6);
        var i = getId(id);
        if (i === -1) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found');
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(apiArray[i]));
        }
    }
    else if (req.method === 'PUT' && req.url.match(/\/todo\/.+/)) {
        var id = req.url.substring(6);
        var i = getId(id);
        if (i === -1) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found');
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
    }
    else if (req.method === 'DELETE' && req.url.match(/\/todo\/.+/)) {
        var id = req.url.substring(6);
        var i = getId(id);
        if (i == apiArray.length) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(' Not Found');
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
};
var attachBodyToRequest = function (req, res, callback) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on("end", function (_any) {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body);
        }
        else {
            console.log('Request Body of other mime types');
        }
        callback(req, res);
    });
};

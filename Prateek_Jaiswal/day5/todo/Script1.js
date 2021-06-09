// JavaScript source code

const http = require('http');
const fs = require('fs');
const url = require('url');
const uniqid = require('uniqid');
const port = 3001;

var todolist = [];
function todo(todowork, status)
{
    this.id = uniqid()
    this.todowork = todowork
    this.status = status
    this.date = new Date()
}

let work = new todo('do the assignment', false);
todolist.push(work);

var server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        handlerequest(req, res);
    } else {
        attachbodytorequest(req, res, handlerequest);
    }

})
    .listen(port, () => {
        console.log('server began at', port);
    })

var gettodo = (req, res) => {

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(todolist, null, 2));
}

var gettodobyid = (req, res, id) => {
    let i
    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id === id) {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(todolist[i], null, 2));
            break;
        }
    }
    if (i == todolist.length) {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('task not found');
        res.end();
    }
}

var handlerequest = (req, res) => {

    console.log("got request ==>", {
        method: req.method,
        path: req.url,
        contenttype: req.headers['content-type'],
        body: req.body
    })

    if (req.method === 'GET' && req.url === '/todo') {
        gettodo(req, res);

    } else if (req.method === 'GET' && req.url.match("/todo/+")) {
        let id = req.url.substring(6);
        gettodobyid(req, res, id);

    } else if (req.method === 'POST' && req.url === '/todo') {
        createtodo(req, res);

    } else if (req.method === 'PUT' && req.url.match("/todo/+").length > 0) {
        let id = req.url.substring(6);
        
        updatetodo(req, res, id);


    } else if (req.method === 'DELETE' && req.url.match("/todo/+").length > 0) {
        let id = req.url.substring(6);
        deletetodo(req, res, id);

    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('page missing/not found');
        res.end();
    }
}
var attachbodytorequest = (req, res, callback) => {
    let body = '';

    req.on('data', (data) => {
        body += data;
    })
    req.on('end', () => {

        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body);
        } else {
            console.log('requested data is of unsupported mime types');
        }
        callback(req, res);
    })

}


var createtodo = (req, res) => {
    let work = new todo(req.body.todowork, req.body.status)
    todolist.push(work);
    console.log(work);
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('work created on the todo list');
    res.end();
}

var updatetodo = (req, res, id) => {
    let i
    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id === id) {
            todolist[i].todowork = req.body.todowork;
            todolist[i].status = req.body.status;
            break;
        }
    }
    if (i == todolist.length) {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('work not found');
        res.end();
    } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(' updated successfully');
        res.end();
    }
}

var deletetodo = (req, res, id) => {

    let todolength = todolist.length
    let i;

    for (i = 0; i < todolist.length; i++) {
        if (todolist[i].id === id) {
            todolist.splice(i, 1)
            break
        }
    }

    if (todolist.length == todolength) {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('work not found')
        res.end()
    } else {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('removed successfully')
        res.end()
    }

}
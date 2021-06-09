"use strict";

//Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
//To include the HTTP module, use the require() method:
var http = require('http');

var url = require('url');

var uuid = require('uniqid');

function todo(title, content, done) {
  this.id = uuid();
  this.date = new Date();
  this.title = title;
  this.content = content;
  this.done = done;
}

var todo1 = new todo('grocerries', 'potatoes,tomatoes', false);
var todolist = [];
todolist.push(todo1); //The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
//Use the createServer() method to create an HTTP server:
//The function passed into the http.createServer() has a req argument that represents the request from the client, 
//as an object (http.IncomingMessage object).
//This object has a property called "url" which holds the part of the url that comes after the domain name:

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    handlerequests(req, res);
  } else {
    attachBodyToRequest(req, res, handlerequests);
  }
}).listen(3000, function () {
  console.log('server is listening at port 3000');
});

var handlerequests = function handlerequests(req, res) {
  if (req.method === 'POST' && req.url === '/todo') {
    var newtodo = new todo(req.body.title, req.body.content, req.body.done);
    todolist.push(newtodo);
    res.writeHead(200, {
      'Content-type': 'text/html'
    }); //if the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type:

    res.write('todo created');
    res.end();
  } else if (req.method === 'GET' && req.url === '/todo') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    }); //when another page is calling the php script, so that the other page can automatically parse the result as json.

    res.end(JSON.stringify(todolist, null, 2));
  } else if (req.method === 'PUT' && req.url.match('/todo/+').length > 0) {
    var id = req.url.substring(6); //console.log(id);

    var i = 0;

    for (i = 0; i < todolist.length; i++) {
      if (todolist[i].id == id) {
        break;
      }
    }

    if (i == todolist.length) {
      res.writeHead(404, {
        'Content-type': 'text/html'
      });
      res.write('Not FOUND');
      res.end();
    } else {
      if (req.body.title) todolist[i].title = req.body.title;
      if (req.body.content) todolist[i].content = req.body.content;
      todolist[i].done = req.body.done;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('List Updated');
      res.end();
    }
  } else if (req.method === 'DELETE' && req.url.match('/todo/+').length > 0) {
    var _id = req.url.substring(6); //console.log(id);


    var i = 0;

    for (i = 0; i < todolist.length; i++) {
      if (todolist[i].id == _id) {
        break;
      }
    }

    if (i == todolist.length) {
      res.writeHead(404, {
        'Content-type': 'text/html'
      });
      res.write('Not found');
      res.end();
    } else {
      todolist.splice(i, 1);
      res.writeHead(200, {
        'Content-type': 'text/html'
      });
      res.write('todo deleted');
      res.end();
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('<h2>Not Found2</h2>');
    res.end();
  }
};

function attachBodyToRequest(req, res, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on("end", function (_any) {
    if (req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(body);
    } else {
      console.log('Request Body of other mime types');
    }

    callback(req, res);
  });
}
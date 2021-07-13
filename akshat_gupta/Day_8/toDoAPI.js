"use strict";
exports.__esModule = true;
var http = require("http");
var uuid = require("uuid");
var port = 3001;
var entry = /** @class */ (function () {
    function entry() {
        this.id = '0';
        this.createdDate = new Date().toJSON().slice(0, 10);
        this.title = '0000';
        this.completed = true;
    }
    return entry;
}());
var toDoList = [];
http.createServer(function (req, res) {
    console.log('Got request =>', { method: req.method, path: req.url, contentType: req.headers['content-type'] });
    if (req.url.substr(0, 5) !== '/todo') {
        res.writeHead(404);
        res.end('Bad Request!');
    }
    else if (req.method === 'GET') {
        if (req.url.length === 5)
            getAll(req, res);
        else
            getOne(req, res);
    }
    else if (req.method === 'PUT')
        attachBodyToRequest(req, res, update);
    else if (req.method === 'POST')
        attachBodyToRequest(req, res, create);
    else if (req.method === 'DELETE')
        deleteOne(req, res);
    else {
        res.writeHead(404);
        res.end('Bad Request!');
    }
}).listen(port, function () {
    console.log('server started at port', port);
});
var getAll = function (req, res) {
    if (toDoList.length === 0) {
        res.end('Nothing to Display.');
        return;
    }
    res.writeHead(200);
    var data = JSON.stringify(toDoList);
    res.end(data);
};
var getOne = function (req, res) {
    res.writeHead(200);
    var str = req.url;
    var tempId = str.substr(6);
    var data = new entry();
    var flag = 0;
    toDoList.every(function (value) {
        if (value['id'] === tempId) {
            data = value;
            flag = 1;
            return false;
        }
    });
    if (flag === 0)
        res.write('Entry does not exist in list.');
    else
        res.write(JSON.stringify(data));
    res.end();
};
var update = function (req, res, Body) {
    var body = JSON.parse(Body);
    if (req.url.substr(5) === '') {
        res.writeHead(404);
        res.end('Bad Request!');
        return;
    }
    res.writeHead(200);
    var str = req.url;
    var tempId = str.substr(6);
    var data = new entry();
    var flag = 0;
    toDoList.every(function (value) {
        if (value['id'] === tempId) {
            if (body.title !== undefined)
                value['title'] = body['title'];
            if (body['completed'] !== undefined)
                value['completed'] = body['completed'];
            data = value;
            flag = 1;
            return false;
        }
        return true;
    });
    if (flag === 0) {
        res.write('Entry does not exist in list.');
    }
    else {
        res.write('Successfully Updated!\n');
        res.write(JSON.stringify(data));
    }
    res.end();
};
var create = function (req, res, Body) {
    var body = JSON.parse(Body);
    if (req.url.substr(5) !== '') {
        res.writeHead(404);
        res.end('Bad Request!');
        return;
    }
    res.writeHead(200); // http header
    if (body['title'] === undefined) {
        res.end('Could not create entry due to lack of info!');
        return;
    }
    var data = {
        'id': uuid.v4(),
        'createdDate': new Date().toJSON().slice(0, 10),
        'title': body['title'],
        'completed': false
    };
    toDoList.push(data);
    res.write('New Entry Creation Successful!');
    res.end();
};
var deleteOne = function (req, res) {
    if (req.url.substr(5) === '') {
        res.writeHead(404);
        res.end('Bad Request!');
        return;
    }
    res.writeHead(200); // http header
    var str = req.url;
    var tempId = str.substr(6);
    var flag = 0;
    var tempArray = [];
    toDoList.every(function (value) {
        if (value['id'] !== tempId)
            tempArray.push(value);
        else
            flag = 1;
        return true;
    });
    toDoList = [];
    toDoList = tempArray.slice();
    if (flag === 0)
        res.write('Entry does not exist in list.');
    else
        res.write('Deletion Successful!');
    res.end();
};
var attachBodyToRequest = function (req, res, callback) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(req, res, body);
    });
};

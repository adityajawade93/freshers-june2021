let http = require('http');
const uuid = require('uuid');
const port = 3001;
var toDoList = []

http.createServer((req, res) => { // all request will have req, res
    console.log("Got request =>", { method: req.method, path: req.url, contentType: req.headers['content-type'], body: req.body });
    if (req.method === 'GET') {
        if(req.url.substr(0,5) !== '/todo') {
            res.writeHead(404)
            res.end('Bad Request!')
        }
        if (req.url.length === 5)
            getAll(req,res);
        else
            getOne(req,res);
    } 
    else if (req.method === 'PUT') 
        attachBodyToRequest(req,res,update);
    else if (req.method === "POST") 
        attachBodyToRequest(req,res,create);
    else if (req.method === "DELETE") 
        deleteOne(req,res);
    else {
        res.writeHead(404)
        res.end('Bad Request!')
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

const getAll = (req,res) => {
    if(toDoList.length === 0) {
        res.end("Nothing to Display.")
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = JSON.stringify(toDoList);
    res.end(data);
}

const getOne = (req,res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var tempId = req.url.substr(6)
    var data;
    let flag = true;
    toDoList.every((value,index,array) => {
        if(value['id'] === tempId) {
            data = value;
            flag = false;
            return false
        }
    });
    if(flag === true) {
        res.end("Entry does not exist in list.")
    }
    res.end(JSON.stringify(data))
}

const update = (req,res) => {
    if(req.url.substr(5) === '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var tempId = req.url.substr(6)
    var data = '';
    let flag = true;
    toDoList.every((value) => {
        if(value['id'] === tempId) {
            if(req.body['title'] !== undefined)
                value['title'] = req.body['title']
            if(req.body['completed'] !== undefined)
                value['completed'] = req.body['completed']
            flag = false;
            data = value;
            return false
        }
        return true
    })
    if(flag === true) {
        res.end("Entry does not exist in list.")
    }
    res.write("Successfully Updated!")
    res.end(JSON.stringify(data))
}

const create = (req,res) => {
    if(req.url.substr(5) !== '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    res.writeHead(200, { 'Content-Type': 'application/json' }); // http header
    if(req.body['title']==undefined) {
        res.end("Could not create entry due to lack of info!")
    }
    toDoList.push({
        'id':uuid.v4(),
        'createdDate':new Date().toJSON().slice(0,10),
        'title':req.body['title'],
        'completed':false
    })
    res.end('New Entry Creation Successful!');
}

const deleteOne = (req,res) => {
    if(req.url.substr(5) === '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    res.writeHead(200, { 'Content-Type': 'application/json' }); // http header
    var tempId = req.url.substr(6)
    var data = '';
    var tempArray = [];
    toDoList.every((value,index,array) => {
        if(value['id'] !== tempId)
            tempArray.push(value);
        else
            data = value;
        return true
    })
    if(data === '') {
        res.end("Entry does not exist in list.")
    }
    res.end('Deletion Successful!');
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
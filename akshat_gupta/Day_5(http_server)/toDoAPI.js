let http = require('http');
const uuid = require('uuid');
const port = 3001;

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
        update(req,res);
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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = JSON.stringify(toDoList);
    res.end(data);
}

const getOne = (req,res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var tempId = req.url.substr(6)
    const data;
    toDoList.every((value) => {
        if(value['id'] === tempId) {
            data = value
            return false
        }
        return true
    })
    res.end(JSON.stringify(data))
}

const update = (req,res) => {
    if(req.url.substr(5) === '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var tempId = req.url.substr(6)
    const data
    toDoList.every((value) => {
        if(value['id'] === tempId) {
            value['completed'] = true;
            data = value;
            return false
        }
        return true
    })
    res.end(JSON.stringify(data))
}

const create = (req,res) => {
    if(req.url.substr(5) !== '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    attachBodyToRequest(req,res,create);
    res.writeHead(200, { 'Content-Type': 'application/json' }); // http header
    toDoList.push({
        'id':uuid.v3(),
        'createdDate':new Date().toJSON().slice(0,10),
        'title':req.body['title'],
        'completed':false
    })
    res.end('Successful!');
}

const deleteOne = (req,res) => {
    if(req.url.substr(5) === '') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    res.writeHead(200, { 'Content-Type': 'application/json' }); // http header
    var tempId = req.url.substr(5)
    const data
    toDoList.every((value,index,array) => {
        if(value['id'] === tempId) {
            data = value
            array.splice(index,1)
            return false
        }
        return true
    })
    res.end(JSON.stringify(data))
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
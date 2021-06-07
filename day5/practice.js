let http = require('http');
var fs = require('fs');
const port = 3001;

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
    if (req.url === '/') {
        req.url = '/index.html'
        loadStaticFiles(req, res);
    } else if (['/index.js', '/index.css'].includes(req.url)) {
        loadStaticFiles(req, res)
    } else if (req.url === '/echo' && req.method === "POST") {
        res.writeHead(200, { 'Content-Type': 'application/json' }); // http header
        const data = JSON.stringify(req.body);
        res.end(data);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Not Found2</h2>');
        res.end();
    }
}

let attachBodyToRequest = (req, res, callback) => {
    let body = '';
    let count = 0;
    req.on('data', (data) => {
        count++;
        console.log('count', count);
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

const loadStaticFiles = (req, res) => {
    const path = __dirname + '/public' + req.url;
    // console.log(req.url, path);
    fs.readFile(path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        data = data.toString();
        res.writeHead(200); // set status code
        res.end(data);
    });
    // fs.createReadStream(path).pipe(res);

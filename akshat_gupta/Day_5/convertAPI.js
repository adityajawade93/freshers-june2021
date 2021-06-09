let http = require('http');
let fs = require('fs')
const CSVToJSON = require('csvtojson');
const port = 3001;

http.createServer((req, res) => { // all request will have req, res
    console.log("Got request =>", { method: req.method, path: req.url, contentType: req.headers['content-type'], body: req.body });
    if(req.url !== '/convert') {
        res.writeHead(404)
        res.end('Bad Request!')
    }
    else if (req.method === 'PUT') {
        attachBodyToRequest(req,res,convertToJSON);
    } 
    else {
        res.writeHead(404)
        res.end('Bad Request!')
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

const convertToJSON = (req,res) => {
    let csvFileName = req.body['csvFileName'];
    const path = './' + csvFileName;
    var newFileName = csvFileName.substr(0,csvFileName.length-4);
    if (fs.existsSync(path) === false) {
        res.writeHead(404)
        res.end('Bad Request!');
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    CSVToJSON().fromFile(csvFileName)
    .then(users => {
        var json = JSON.stringify(users);
        fs.writeFile(newFileName + '.json', json, 'utf8', (err) => {
            if (err) {
                throw err;
            }
        })
    })
    .catch(err => {
        console.log(err);
    });
    res.end("Conversion Successful!");
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
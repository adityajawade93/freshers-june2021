let http = require('http');
const CSVToJSON = require('csvtojson');
const fs = require('fs');

const port = 3001;



http.createServer((req, res) => { // all request will have req, res
    if (req.method === 'PUT') {
        attachBodyToRequest(req, res, handleRequest)
    } else {
        res.writeHead(400)
        res.end('Bad Request!')
    }
}).listen(port, () => {
    console.log("server started at port", port);
});


function badRequest(res, message) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(message);
    res.end();
}

function convert(fileName, jsonFile) {
    CSVToJSON().fromFile(fileName)
        .then(data => {
            fs.writeFile(jsonFile, JSON.stringify(data, 5, 3), (err) => {
                if (err) {
                    throw err;
                }
            });

        }).catch(err => {
            // log error if any
            console.log(err);
        });

}


let handleRequest = (req, res) => {
    console.log("Got request =>", {
        method: req.method,
        path: req.url,
        contentType: req.headers['content-type'],
        body: req.body
    });

    if (req.method === 'PUT' && req.url.match("/convert/+").length > 0) {
        const fileName = req.url.split('/')[2];
        const path = './' + fileName;
        const jsonFile = fileName.substr(0,fileName.length-4) + '.json';
        fs.stat(path, (err, stat) => {
            if (err) {
                res.writeHead(400)
                res.end('Error', err);
            }
            if (err == null) {
                convert(fileName, jsonFile);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end("Conversion Successful!");
            } else if (err.code === 'ENOENT') {
                badRequest(res, 'file dosent exist');
            }

        });


    } else {
        badRequest(res, 'incorrect path');
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







const http = require('http');
const fs = require('fs');
const Path = require('path');
const { converter } = require('./read_file');
const port = 4000;

function createFile(req, res) {
    let filename = req.url.substring(6);
    let name = req.url.substring(6) + '.csv';
    let paths = Path.join('./csv_files/', name);
    fs.access(paths, fs.F_OK, (err) => {
        if (err) {
            console.log("File does not exist.")
            //   console.log(name,typeof(name));
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404! FILE NOT FOUND");
        } else {
            console.log("File exists.")
            converter(paths, filename);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("successfully changed file to json and stored in directory");
        }
    })
    // console.log(paths);
}

http.createServer((req, res) => {
    if (req.method == "PUT" && req.url.match("/find/+").length > 0) {
        createFile(req, res);
    }
}).listen(port, () => {
    console.log("server started at port", port);
});


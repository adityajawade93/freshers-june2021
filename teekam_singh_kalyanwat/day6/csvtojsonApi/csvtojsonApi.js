let http = require('http');
var fs = require('fs');
const csvtojson = require('csvtojson');
const path = require('path');

const port = 3001;


http.createServer((req, res) => {

    handleRequest(req, res);

}).listen(port, () => {
    console.log("server started at port", port);
});


let handleRequest = (req, res) => {
    console.log("Got request =>", { method: req.method, path: req.url, contentType: req.headers['content-type'], body: req.body });

    if (req.method === 'GET' && req.url.match("/getfile/+").length > 0) {
        let file_name = req.url.substring(9);

        const directoryPath = path.join('./csv_file_folder');

        fs.readdir(directoryPath, function (err, files) {
            var len = files.length;
            let i = 0;
            for (i = 0; i < len; i++) {
                if (files[i] === file_name) {
                    break;
                }
            }

            if (i === len) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('file doesnt exist');
                res.end();
            }
            else {
                let file_path = path.join('./csv_file_folder/' + files[i]);
                let file = files[i]; 
                var len = file.length-4;
                var filename = file.substr(0, len) + '.json';

                csvtojson()
                    .fromFile(file_path)
                    .then((jsfile) => {

                        fs.writeFile('./json_file_folder/' + filename, JSON.stringify(jsfile), 'utf-8', (error) => {
                            if (error) console.log(error);
                        })
                    })
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('task successful');
                res.end();

            }
        });

    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Page Not Found</h2>');
        res.end();
    }
}
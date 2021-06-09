let http = require('http');
const fs = require('fs');
const csv = require('csvtojson')
const path = require('path');
const util = require('util')

const port = 3001;

http.createServer((req, res) => {
    if (req.method === 'GET') {
        handleRequest(req, res);
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

function successResponse(res, message) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = JSON.stringify(message);
    res.end(data);
}

function errorResponse(res, message) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(message);
    res.end();
}

async function convertCsvToJson(filePath, res) {
    try{
        const jsonData = await csv().fromFile(filePath);
        const data = JSON.stringify(jsonData);
        const filename = path.parse(filePath).name;

        const writeFile = util.promisify(fs.writeFile)
        await writeFile(`${filename}.json`, data);
        
        successResponse(res, 'Conversion successful');
    }
    catch {
        errorResponse(res, 'Error while converting');
    }
}

let handleRequest = (req, res) => {
    console.log("Got request =>", { 
        method: req.method, 
        path: req.url, 
        contentType: req.headers['content-type'], 
        body: req.body 
    });

    if (req.method === 'GET' && !!req.url.match("/csvtojson/.+") && req.url.match("/csvtojson/.+").length > 0) {
        const filename = req.url.split('/')[2];
        const path = `./${filename}`;

        if (fs.existsSync(path)) {
            convertCsvToJson(path, res);
        } 
        else {
            errorResponse(res, 'File not present');
        }
    }
    else errorResponse(res, '<h2>Not Found</h2>');
}

// api -> /csvtojson/:filename
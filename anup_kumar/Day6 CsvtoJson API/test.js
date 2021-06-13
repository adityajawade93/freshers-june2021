let http = require('http');
let url = require('url');
const CSVToJSON = require('csvtojson');
const fs = require('fs')

const port = 3001;

http.createServer((req,res) => {
    if (req.method === 'GET') {
        return handleGetReq(req, res)
    } else if (req.url === '/todo' && req.method === 'POST') {
        return handlePostReq(req, res)
    } else if (req.method === 'DELETE') {
        return handleDeleteReq(req, res)
    } else if (req.method === 'PUT') {
        return handlePutReq(req, res)
    }
    else{
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})
.listen(port, () => {
    console.log("server started at port", port);
});

let handleGetReq = (req,res) => {
    console.log("Get Request");
    console.log(url.parse(req.url,true));
    if(req.url === '/'){
        res.writeHead(200); // set status code
        res.end("Welcome to Server");
    }
    if(req.url.match(/\/.+/)){
        var filename = req.url.substring(1);
        path = './' + filename +  '.csv';
        console.log(req.url,path);
        try {
            if (fs.existsSync(path)) { 
                var data = '';               
                CSVToJSON()
                .fromFile(path)
                .then((jsonData) => {
                    console.log(jsonData);
                    data += JSON.stringify(jsonData);
                    fs.writeFile(filename + '.json', data, (err) => {
                        if (err) throw err;
                    });
                });
                console.log(data);
                res.writeHead(200); // set status code
                return res.end("File successfully converted");
            }
            else{
                return handleError(res,404);
            }
        } catch(err) {
            console.error(err)
        }        
    }
    return handleError(res,404);
}

let handleError = (res, code) => {
    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 
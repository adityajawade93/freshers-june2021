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
        res.end(`{"error occured": "${http.STATUS_CODES[404]}"}`)
    }
})
.listen(port, () => {
    console.log("server started at port", port);
});
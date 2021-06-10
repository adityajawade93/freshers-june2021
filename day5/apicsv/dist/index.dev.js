"use strict";

var http = require('http');

var csvtojson = require('csvtojson');

var fs = require('fs');

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    handlerequest(req, res);
  } else {
    attachBodyToRequest(req, res, handlerequest);
  }
}).listen(3000, function () {
  console.log('server listening at 3000');
});

var handlerequest = function handlerequest(req, res) {
  if (req.method === 'POST' && req.url === '/convert') {
    if (req.body.filename == null) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.write('filename missing');
      res.end();
      return;
    }

    var path = './' + req.body.filename + '.csv';

    if (fs.existsSync(path)) {
      csvtojson().fromFile(path).then(function (jsondata) {
        console.log(jsondata);
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jsondata));
        fs.writeFile('output.json', JSON.stringify(jsondata), function (err) {
          console.log(err);
        });
        console.log('json is saved');
      });
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      });
      res.write('filename MISSING');
      res.end();
    }
  }
};

var attachBodyToRequest = function attachBodyToRequest(req, res, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on("end", function (_any) {
    if (req.headers['content-type'] === 'application/json') {
      req.body = JSON.parse(body);
    } else {
      console.log('Request Body of other mime types');
    }

    callback(req, res);
  });
};
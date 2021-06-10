const csvtojson = require('csvtojson')
const fs = require('fs')

const http = require('http')

const port = 4001;

// const csvfilepath = "data.csv"

http.createServer((req, res) => { // all request will have req, res
    if (req.method === 'GET') {
        handleRequest(req, res);
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

let handleRequest = (req, res) => {
    console.log("Got request =>",
        {
            method: req.method,
            path: req.url,
            contentType: req.headers['Content-type'],
            body: req.body
        })
    if (req.method === 'GET' && req.url.match(/\/.+/)) {

        const filename = req.url.substring(1);
        const csvpath = './' + filename + '.csv';
        console.log(csvpath)
        try {
            if (fs.existsSync(csvpath)) {
                var data = ''
                csvtojson()
                    .fromFile(csvpath)
                    .then((json) => {
                        console.log(json)

                        fs.writeFileSync(filename + '.json', JSON.stringify(json), "utf-8", (err) => {
                            if (err) console.log(err)
                        })
                    })
                // console.log(data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('successfully converted');

                res.end();

            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('File Not Found');
                res.end();

            }
        }
        catch (e) {
            console.log(e);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Error in converting');
            res.end();
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Not Found');
        res.end();
    }

}


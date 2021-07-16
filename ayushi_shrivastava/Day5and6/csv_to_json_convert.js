const http = require('http');
const CSVToJSON = require('csvtojson');
var fs = require('fs');

const port = 8000;

http.createServer((request, response) => {
    if (request.method === 'GET' && request.url.match(/\?.+=.*/g)) {
        var baseUrl = 'http://' + request.headers.host + '/';
        var myUrl = new URL(request.url, baseUrl);
        let url = new URL(myUrl);
        let search_params = url.searchParams;
        let filename = search_params.get('filename');

        // Open the file
        fs.open(filename, 'r', (err, data) => {
            if (err) {
                response.writeHead(404, { "Content - Type": "text/html" });
                response.end("csv file does not exist on server");
            }
            else {
                CSVToJSON().fromFile(filename)
                    .then(data => {

                        data = JSON.stringify(data);
                        let str = filename.replace(".csv",".json");
                        var writerStream = fs.createWriteStream(str);

                        // Write the data to stream with encoding to be utf8
                        writerStream.write(data, 'UTF8');

                        // Mark the end of file
                        writerStream.end();

                        // Handle stream events --> finish, and error
                        writerStream.on('finish', function () {
                            console.log("Write completed.");
                            response.writeHead(200, { 'Content-Type': 'text/html' });
                            response.end("operation successful!");
                        });

                        writerStream.on('error', function (err) {
                            console.log(err.stack);
                        });

                        console.log("Program Ended");

                    }).catch(err => {
                        console.log(err);
                    });
            }
        });
    }
}).listen(port, () => {
    console.log(`The server is running at port ${port}`);
});
const CSVToJSON = require('csvtojson');
var fs = require("fs");

// convert addresses.csv file to JSON array
CSVToJSON().fromFile('addresses.csv')
    .then(data => {

        data = JSON.stringify(data);
        var writerStream = fs.createWriteStream('output.txt');

        // Write the data to stream with encoding to be utf8
        writerStream.write(data, 'UTF8');

        // Mark the end of file
        writerStream.end();

        // Handle stream events --> finish, and error
        writerStream.on('finish', function () {
            console.log("Write completed.");
        });

        writerStream.on('error', function (err) {
            console.log(err.stack);
        });

        console.log("Program Ended");

    }).catch(err => {
        console.log(err);
    });
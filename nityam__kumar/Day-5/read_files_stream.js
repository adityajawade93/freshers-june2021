// const createReadStream = require('fs').createReadStream;
// const createWriteStream = require('fs').createWriteStream;
// const csvjson = require('csvjson');
// const toObject = csvjson.stream.toObject();
// const stringify = csvjson.stream.stringify(null,4);
// createReadStream('./car-sales-extended.csv', 'utf-8')
//     .pipe(toObject)
//     .pipe(stringify)
//     .pipe(createWriteStream('./cars_stream.json'));










const fs = require('fs');
const CSVToJSON = require('csvtojson');

const createReadStream = fs.createReadStream('./car-sales-extended.csv', 'utf-8');
const writeStream = fs.createWriteStream('./cars_stream.json');



// createReadStream('./car-sales.csv', 'utf-8')
//     .pipe(toObject)
//     .pipe(stringify)
//     .pipe(createWriteStream('./cars_stream.js'));
// writeStream._write = (chunk,encoding, next) => {
//     console.log(chunk.toString());
//     next()
//   }

createReadStream
    .pipe(
        CSVToJSON({
            downstreamFormat: "array"
        })
    )
    .pipe(writeStream);
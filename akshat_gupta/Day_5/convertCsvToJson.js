const CSVToJSON = require('csvtojson');
var fs = require('fs');

CSVToJSON().fromFile('sample.csv')
    .then(users => {

        var json = JSON.stringify(users);

        fs.writeFile('myOutputfile.json', json, 'utf8', (err) => {
    if (err) {
        throw err;
    }
    })
})
    .catch(err => {
        // log error if any
        console.log(err);
    });
// require csvtojson module
const CSVToJSON = require('csvtojson');
const fs = require('fs')

// Method-2

CSVToJSON()
.fromFile('addresses.csv')
.then((jsonData) => {
    console.log(jsonData);
    const data = JSON.stringify(jsonData);
    fs.writeFile('addresses.json', data, (err) => {
        if (err) throw err;
    });
});


// convert users.csv file to JSON array
CSVToJSON().fromFile('addresses.csv')
    .then(users => {
        // users is a JSON array
        // log the JSON array
        console.log(users);

    }).catch(err => {
        // log error if any
        console.log(err);
    });
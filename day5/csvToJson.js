// require csvtojson module
const CSVToJSON = require('csvtojson');
const fs = require('fs');

// convert users.csv file to JSON array
CSVToJSON().fromFile('employees.csv')
    .then(employees => {
        // employees is a JSON array which is returned as data after
        //csvtojson is done using fromFile and it returns a promise
        //the promise resolved gives (employees) as data that is in json array
        
        //JSON.stringify(jsonObject,a replacer,space)
        // console.log(employees);
        fs.writeFile('employees.json', JSON.stringify(employees, 5, 3), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON array is saved.");
        });

    }).catch(err => {
        // log error if any
        console.log(err);
    });


const fs=require('fs');
const CSVToJSON = require('csvtojson');


CSVToJSON().fromFile('./car-sales.csv')
    .then(cars => {

        // cars is a JSON array
        // log the JSON array
        console.log(cars);
        //  console.log(JSON.stringify(cars,"hj",4));
        fs.writeFile('cars.json', JSON.stringify(cars,null,4), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON array is saved.");
        });
    

    }).catch(err => {
        // log error if any
        console.log(err);
    });


   
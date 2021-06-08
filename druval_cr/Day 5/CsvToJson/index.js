const csv=require('csvtojson')
const fs = require('fs')

const csvFilePath='./userDetails.csv'

csv()
.fromFile(csvFilePath)
.then((jsonData) => {
    console.log(jsonData);

    const data = JSON.stringify(jsonData);
    fs.writeFile('userDetails.json', data, (err) => {
        if (err) throw err;
    });
});

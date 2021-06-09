let http = require('http');
const fs = require('fs');
const csv = require('csv-parser');


const csvtojs = require('csvtojson');
let csv_file = "file.csv";

csvtojs()
.fromFile(csv_file)
.then((jsfile) => {

    fs.writeFile('output_jason_file.json',JSON.stringify(jsfile),'utf-8', (error) =>{
       if(error) console.log(error);
    })
})

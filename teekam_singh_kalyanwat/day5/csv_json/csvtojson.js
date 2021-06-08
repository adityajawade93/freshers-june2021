let http = require('http');
const fs = require('fs');
const csv = require('csv-parser');
const students = [];

// Reading csv file
fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', function (row) {

        const student = {
            Student_name: row.student_name,
            Age: row.age,
            Branch: row.branch,
        }
        students.push(student);
    })
    .on('end', function () {
        console.table(students);
    })


// converting and writing csv to json

const csvtojs = require('csvtojson');
let csv_file = "file.csv";

csvtojs()
.fromFile(csv_file)
.then((jsfile) => {

    console.log(jsfile)

    fs.writeFile('jason_file.js',JSON.stringify(jsfile),'utf-8', (error) =>{
       if(error) console.log(error);
    })
})


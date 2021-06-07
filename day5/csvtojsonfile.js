const csvtojson = require('csvtojson')
const fs = require('fs')

var csvfile = "csvdata.csv"

csvtojson()
.fromFile(csvfile)
.then((jsonobj) =>{
    console.log(jsonobj)

    fs.writeFile('jsonfile.js',JSON.stringify(jsonobj),'utf8',
    (error) =>{
        console.log(error)
    })
})
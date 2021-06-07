const csv = require('csv-parser')
const { on } = require('events')
const fs = require('fs')

var csvdata = []

fs.createReadStream('csvdata.csv')
.pipe(csv())
.on('data', (data) =>{
    console.log(data)
    csvdata.push(data)
})
.on('end' ,() =>{
    console.log(csvdata)
})

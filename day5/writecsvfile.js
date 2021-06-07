const writecsv = require('csv-writer').createObjectCsvWriter

const csvwrite = writecsv({
    path :'writecsvdata.csv',
    header:[
        {id:'name',title :'name'},
        {id:'age',title :'age'}
    ]
})

const csvdata = [
    {
        name:'sujit',
        age:'20'
    },
    {
        name:'sandeep',
        age:'18'
    }
]

csvwrite
.writeRecords(csvdata)
.then(() =>{console.log('this csv file is written')})
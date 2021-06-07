const createcsvWriter = require('csv-writer').createObjectCsvWriter

const csvWriter = createcsvWriter({
    path:'write.csv',
    header:[
        {id:"fullname",title:"name"},
        {id:"position",title:"POSITION"},
        {id:"age",title:"AGE"}
    ]
})

const save = [
    {fullname:"Anshuman",position:"SWE",age: 22 },
   { fullname:"Ankesh",position:"Disgital Engineer",age: 23}
]

csvWriter.writeRecords(save)
.then(() => {
    console.log('....done')
});
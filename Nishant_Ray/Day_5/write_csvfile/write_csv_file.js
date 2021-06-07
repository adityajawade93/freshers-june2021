const createCsvWriter=require('csv-writer').createObjectCsvWriter;
const csv_writer=createCsvWriter({
 path: 'file.csv',
 header:[
     {id : 'name', title : 'NAME'},
     {id : 'age', title : 'AGE'},
     {id : 'sub', title : 'SUBJECT'}
 ]
});

const records=[
    {name:'Nitin Arora', age: 24, sub: 'Ethics'}
];

csv_writer.writeRecords(records)
.then(() =>{
    console.log("writing is done");
});
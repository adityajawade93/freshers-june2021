const csv=require('csv-parser');
const { on } = require('events');
const fs=require('fs')
const required_data=[];

fs.createReadStream('data.csv')
.pipe(csv({}))
.on('data',(data)=> required_data.push(data))
.on('end',()=> {console.log(required_data);})


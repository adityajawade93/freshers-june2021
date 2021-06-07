const csv = require('csv-parser');
const fs = require('fs');

const result = [];

fs.createReadStream('my.csv')
.pipe(csv({}))
.on('data',(data) => result.push(data))
.on('end',() =>{
    console.log(result);
});

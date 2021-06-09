const fs = require('fs')
const csvtojson = require('csvtojson');
csvtojson()
.fromFile("test.csv")
.then((jsonData)=>{
    console.log(jsonData);
    fs.writeFileSync("output.json",JSON.stringify(jsonData),(err)=>{
        console.log(err);
    })

})


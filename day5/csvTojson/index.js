const csvtojson = require('csvtojson');
const fs = require('fs');

const filepath = "example.csv"
csvtojson()
.fromFile(filepath)
.then((jsonData)=>{
    console.log(jsonData);

    // saving the file or writing the file we will use the file sysytem which is the built in method in nodejs

    fs.writeFileSync("output.json",JSON.stringify(jsonData),"utf-8",(err)=>{
        console.log(err);
    })

})
.catch((err)=>{
    console.log(err);
})
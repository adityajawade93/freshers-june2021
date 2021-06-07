const csvtojson=require('csvtojson')
const fs=require('fs')

csvtojson()
.fromFile("data.csv")
.then((json)=>{
     console.log(json);
    fs.writeFileSync('req_json_file.json',JSON.stringify(json),"utf-8",(err)=> {
        console.log(err);
    })  
})
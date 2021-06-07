const fs = require("fs");
const csvParser = require("csv-parser");
const fileName= "SampleCSVFile_2kb.csv";
var csvData=[];

var writetotxtFile = function(){
    var contenTowrite="";
    csvData.forEach((data)=>{
        contenTowrite+=JSON.stringify(data)+"\n";
    })
    fs.writeFile("output.txt",contenTowrite,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("File is saved successfully");
        }
    });
}
fs.createReadStream(fileName).pipe(csvParser()).on('data',function(data){
    csvData.push(data);
    //console.log(data);
    
}).on('end',writetotxtFile)
const http = require("http");
const uuid = require("uuid");
const csvParser = require("csv-parser");
const fs = require("fs");
const csvFileList=['a','b'];

var checkValidFilename = function(inputFileName){
    return csvFileList.includes(inputFileName);
}

var writetocsvFile =(csvData,inputFileName)=>{
    var outputFile=inputFileName+".json";
    var promiseFunction=(resolve,reject)=>{
        var contenTowrite=JSON.stringify(csvData,null,4);
        
        fs.writeFile(outputFile,contenTowrite,(err)=>{
            if(err){
                reject("Error")
            }
            else{
                console.log("File is saved successfully");
                resolve("File is saved successfully")
                
            }
        });
};
    return new Promise(promiseFunction);
}



var csvtoJSON =(inputFileName)=>{
    var csvFilePath="./"+inputFileName+".csv";
    var csvData=[];
    fs.createReadStream(csvFilePath).pipe(csvParser()).on('data',function(data){
        csvData.push(data);
        
    }).on('end',()=>{
        writetocsvFile(csvData,inputFileName).then(function(data){
            csvData=[];
            console.log(data);
            
        }).catch((data)=>{
            csvData=[];
            console.log(data);
        });
        
    });
}



http.createServer((req,res)=>{
    if(req.method==="POST" && req.url.match("/parse/+")){
        let inputFileName=req.url.substring(7);
        if(inputFileName===""){
            res.writeHead(200,{ 'Content-Type': 'text/plain' });
            res.write("File name is not provided");
        }
        else if(checkValidFilename(inputFileName)){
            var p1 = new Promise((resolve,reject)=>{
                if(true){
                    csvtoJSON(inputFileName);
                    resolve("Written complete");
                }
                else{
                    reject("Incomplete");
                }
            });
            p1.then((data)=>{
                console.log(data);
                return new Promise((resolve,reject)=>{
                    res.writeHead(200,{ 'Content-Type': 'text/plain' });
                    res.write("JSON file created");
                    
                    console.log("In the message")
                    resolve("yes");
                });
                
            }).then((data)=>{console.log(data)});
            
            
        }
        else
        {
            res.writeHead(404,{ 'Content-Type': 'text/plain' });
            res.write("In valid file name");
        }
    }
    else{
        res.writeHead(400,{ 'Content-Type': 'text/plain' });
        res.write("Invalid URL");
    }
    
    res.end("Done");
   
}).listen(3000,()=>{
    console.log("Listing to port 3000")
});
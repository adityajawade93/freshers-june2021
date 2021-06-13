const http=require("http");
const fs= require("fs");
const csvParser =require("csv-parser"); 
const root= __dirname;
//console.log(root);
var fileList=[];

var readcsvFileName = (csvFolderPath)=>{
    
    fs.readdir(csvFolderPath,(err,files)=>{
        if(err){
            throw new Error("Internal Error");
        }
        else{
            
            files.forEach((path)=>{
                fileList.push(path);
                //console.log(path,"A");
            })
            
        }
        //console.log(fileList);
        
    });
    
    //return fileList;
}

var writetocsvFile = function(csvfilePath,csvData){
    var contenTowrite=JSON.stringify(csvData,null,4);
    fs.writeFile(csvfilePath+".json",contenTowrite,(err)=>{
        if(err){
            throw new Error("Reading file error");
        }
        else{
            console.log("File is saved successfully");
        }
    });
}
var writetocsvFileCallback=(csvfilePath,csvData)=>{
    writetocsvFile(csvfilePath,csvData);
}

var csvtoJSON = (csvfileName)=>{
    var csvData=[];
    var csvfilePath=root+"/CSVfolder/"+csvfileName;
    fs.createReadStream(csvfilePath).pipe(csvParser()).on('data',function(data){
        csvData.push(data);
        //console.log(data);
        
    }).on('end',writetocsvFileCallback);
}
async function readfileName(){
    await readcsvFileName(root+"/CSVfolder");
    
    console.log(fileList);
}
readfileName();
//readcsvFileName(root+"/CSVfolder");



const http = require("http");
const request = require("request");
const fs = require("fs");
const josn2csv = require("json-2-csv");

const fileNameToStorePassengerInfo="./passengerInfo.json";
const getPassengerInfoFromAPI = (url)=>{
    const apiCallPromise = function(resolve,reject){
        request.get(url,(error,response,body)=>{
            
            if(error){
                reject("Error");
            }
            else{
                resolve(body);
            }
        });

    }
    return new Promise(apiCallPromise);
}


const callApi = async ()=>{
    var passengerInformationList=[];
    for(let i=0;i<18;i++){
        await getPassengerInfoFromAPI("https://api.instantwebtools.net/v1/passenger?page="+i+"&size=500")
        .then( function(data){
            passengeInformation=JSON.parse(data)["data"];
            passengerInformationList=passengerInformationList.concat(passengeInformation);
            console.log(passengerInformationList.length);
        }
        );
    }
    return passengerInformationList;
}
var info;
const getPassengerInfo = async (fileNameToStorePassengerInfo)=>{
    
    passengerInfoList= await callApi();
    console.log("Total Number of Passenger",passengerInfoList.length);
    var contenTowrite=JSON.stringify(passengerInfoList,null,4);
    josn2csv.json2csv(passengerInfoList,(err,csvInfo)=>{
        if(err){
            console.log("Error");

        }
        else{
            fs.writeFileSync('./passengerInfo.csv', csvInfo);
        }
        
    });
    fs.writeFile(fileNameToStorePassengerInfo,contenTowrite,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log("File is saved successfully");
        }
    });
}
getPassengerInfo(fileNameToStorePassengerInfo);




const koa = require("koa");
const koaRouter= require("@koa/router");
const bodyParser = require("koa-bodyparser");
const fs =require('fs');
const { resolve } = require("any-promise");
const app = new koa();
const router= new koaRouter();

var passengerInfoList=[]
const fetchPassengerInfoFromFile= (filePath)=>{
    
    const prmiseRead=(resolve,reject)=>{
        fs.readFile(filePath,'utf8',(err,data)=>{
            if(err){
                reject("File Not Read");

            }
            else{
                resolve(data);
                
            }
        });
    };
    
    return new Promise(prmiseRead);
}

const getData=async()=>{
    try{
        await fetchPassengerInfoFromFile("./../assignment_1/passengerInfo.json").then((data)=>{
            console.log("Get Data Inside");
            passengerInfoList=JSON.parse(data);
            console.log(passengerInfoList.length)
        });
        
        console.log("Get data outside");
    }
    catch{
        console.log("Read Error")
    }
}
getData();

const validateQueryURL= (query)=>{
    try{
        console.log(typeof query);
        const page=Number(query.page);
        const size=Number(query.size);
        console.log(typeof page);
        if(page!==undefined && size!== undefined && ! isNaN(page) && ! isNaN(size) && page>=0 && size>0){
            return {"page":page,"size":size};
        }
        else{
            return {"page":0,"size":500};
        }
    }
    catch {
        return {"page":0,"size":500};
    }

}

const findRangeofRequestedData =(page,size)=>{
    const numberOfentry=passengerInfoList.length;
    const maxNumberOfPages= Math.ceil(numberOfentry/size);
    let minIndex=0;
    
    if(page<maxNumberOfPages){
        minIndex=page*size;
    let maxIndex= numberOfentry<size?numberOfentry: size*(page+1);
    return [minIndex,maxIndex];
    }
    else{
        return false;
    }

}

const fetchpassenerInfo= async (ctx,next)=>{
    inputData=validateQueryURL(ctx.query);
    const range=findRangeofRequestedData(inputData.page,inputData.size);
    if(range===false){
        ctx.body="Page Number overflow";
    }
    else{
        [minIndex,maxIndex]=range;
        ctx.body=passengerInfoList.slice(minIndex,maxIndex);
    }
    
}

router.get("/v1/passengers",fetchpassenerInfo);
app.use(bodyParser());
app.use(router.routes());

app.use(async ctx => {
    ctx.body = 'Page Not Found';
});

module.exports = {app};

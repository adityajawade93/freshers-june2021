
const fs = require('fs');


exports.passengers = async(ctx)=>{
  
       
       let page = ctx.request.query.page;
       let size = ctx.request.query.size;
       if(isNaN(page)||isNaN(size))
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid query"
            }
            return;
        }
        page = Number(page);
        size = Number(size);
        
        if(page<0||page>17)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid page number"
            }
            return;
        }
        if(size<=0||size>500)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid size"
            }
            return;
        }
        
        try{
            
            let response_body = await getPassengersList(page,size);
            ctx.response.status=200;
            ctx.response.type = 'application/json';
            ctx.body=response_body;

          
         }
        catch(e)
        {
            console.log(e.stack);
            ctx.response.status=401;
            ctx.response.type = 'application/json';
            ctx.body = {
                 "msg" : "something wrong happens"
            };
        }
       
       
       
};



function getPassengersList(page,size){

   return new Promise((resolve,reject)=>{
       try{
        const StreamArray = require( 'stream-json/streamers/StreamArray');
        const pipeline = fs.createReadStream('passengerdata.json').pipe(StreamArray.withParser()); 
        let response_body=[];
        pipeline.on('data',({key,value})=>{
            if(key>=page*500&&key<page*500+size)
              response_body.push(value);
            if(key>=page*500+size)
             return;  
        });
        pipeline.on('end',()=>{
               resolve(response_body);
        });
       }
       catch(e){
            reject(e);
       }
   })

}
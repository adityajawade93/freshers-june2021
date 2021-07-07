const axios = require('axios');
const converter = require('json-2-csv');
const fs = require('fs');

const fetchData = async()=>{


    let options = {
  
        'method' : 'GET',
        'url': 'https://api.instantwebtools.net/v1/passenger?page=0&size=500',
         'headers': {}
   };
   

   let passengerList = [];
   for(let i=0;i<18;i++)
   {

         try{

            options.url = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=500`
            let response = await axios(options);
            passengerList = passengerList.concat(response.data.data);

         }
         catch(e)
         {
             console.log(e.stack);
             break;
         }
   }
   console.log(passengerList.length);

       fs.writeFile('passengerdata.json',JSON.stringify(passengerList),'utf-8',(err)=>{
           if(err)
            throw err;
            console.log("passenger.json saved");
       });
       converter.json2csv(passengerList,(err,csv)=>{
           if(err)
            throw err;
            fs.writeFileSync('passengerData.csv',csv);
       })

  


}
fetchData();
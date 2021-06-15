const axios = require('axios');
const fs=require('fs')
const jsonToCsv = require('json-2-csv');

const sendGetRequest = async () => {
    var data =[];

    for(let i=0;i<18;i++)
    {
        console.log(`page no ${i} done`);
        
        let urlhelper="https://api.instantwebtools.net/v1/passenger?page="+i+"&size=500";
        
        try 
        {
            const resp = await axios.get(urlhelper);
            // console.log(resp.data.data);
            data=data.concat(resp.data.data);
        } 
        catch (err) 
        {
        // Handle Error Here
        console.error(err);
        }
    }
    
    
    fs.writeFile("Passenger.json", JSON.stringify(data), (err)=> 
    {
    // Error checking
    if (err) throw err;
    console.log("Json data added");
    });

  jsonToCsv.json2csv(data,(err,csv)=>{
      if(err) throw err;
     fs.writeFileSync('Passenger.csv',csv);
     console.log("CSV data added");
    });
}
    
sendGetRequest();



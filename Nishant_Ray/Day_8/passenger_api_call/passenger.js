var fs=require('fs')
var axios=require('axios')
const json_to_csv= require('json-2-csv');
var page=0;
var size=500;
var options = {
    'method': 'GET',
    'url': `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`,
    'headers': {}
   };


let pageIndexes=[]
for(let i=0;i<18;i++)
pageIndexes.push(i)



const fetch=async ()=>{
    var listPassengers=[]
    try {
        const res=await Promise.all(pageIndexes.map((index)=>{
            page=index
            return axios(options)
        }))
        
        res.map(data_list=>{
           listPassengers=listPassengers.concat(data_list.data.data)
        })
    
    } catch (error) {
        console.log(error)
    }
    fs.writeFile("passengers.json",JSON.stringify(listPassengers),(err)=>{
      if(err)
      throw err;
        console.log("done with json");
    })
    json_to_csv.json2csv(listPassengers, (err, csv) => {
      if (err) {
          throw err;
      }
      console.log("done with csv");
      fs.writeFileSync('passengers.csv',csv);
  });
}

fetch();
let axios = require('axios');
let  convertor = require('json-2-csv');
let fs= require('fs');

let passangerlist = [];

const fetchApi = async ()=>{
    for(i=0;i<18;i++){
        await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${i}&size=500`)
        .then((response)=>{
            passangerlist=passangerlist.concat(response.data.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    console.log(passangerlist.length)
    
    fs.writeFile('passangers.json',JSON.stringify(passangerlist),'utf-8',(err)=>{
        console.log(err);
    })

    convertor.json2csv(passangerlist,(err,csv)=>{
        if(err){
            console.log(err);
        }else{
            fs.writeFileSync('passangers.csv',csv);
        }
    })
    
}

fetchApi();





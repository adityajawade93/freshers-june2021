import { type } from "os";
const fs=require('fs')
const axios=require('axios')
const json_to_csv= require('json-2-csv');
let page:number=0;
let size:number=500;
let options:{
    method:string;
    url:string
    headers?:any;
} = {
    'method': 'GET',
    'url': `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`,
    'headers': {}
   };
interface passenger_data{
    _id:string;
    name:string;
    trips:number;
    airline:any[];
    __v:number;
}
interface res_type{
    data:{
  totalPassengers:number;
  totalPages:number;
  data:passenger_data[];
    }
}

   axios(options)
.then((response:res_type) => {
    return response.data.totalPages;
})
.then(async(totalPages:number) => {
    let res:res_type[]= [];
    let listPassengers:passenger_data[]=[];
    for (let i:number = 0; i < totalPages ; i++) {
        page=i;
        res.push(
            axios(options)
        )
    }
    const res1:res_type[]= await Promise.all(res)
     
    res1.map((data_list:res_type)=>{
        listPassengers=listPassengers.concat(data_list.data.data)

     })
        fs.writeFile('passengers.json', JSON.stringify(listPassengers), 'utf8', (err) => {
            if (err) {
                throw err;
            }
        });

        json_to_csv.json2csv(listPassengers, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync('passengers.csv',csv);
        });
    
})
.catch((error) => {
    if (error) 
        throw error;
});
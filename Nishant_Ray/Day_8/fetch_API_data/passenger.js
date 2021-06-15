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


   axios(options)
.then((response) => {
    return response.data.totalPages;
})
.then(async(totalPages) => {
    let res = [];
    let listPassengers=[];
    for (i = 0; i < totalPages ; i++) {
        page=i;
        res.push(
            axios(options)
        )
    }
    const res1= await Promise.all(res)
     
    res1.map(data_list=>{
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
const fs = require('fs');
const axios = require('axios');
const jsontocsv = require('json-2-csv');
let users = [];

let i = 0;

function helper(num) {
    axios.get(`https://api.instantwebtools.net/v1/passenger?page=${num}&size=500`)
        .then(res => {
            let passengers = res.data['data'];
            console.log(`done${i}`);
            users = users.concat(passengers);
            i++;
            if (i < 18) {
                helper(i);
            }
            if (i == 18) {
                let jsonString = JSON.stringify(users);
                fs.writeFile('./passangers.json', jsonString, err => {
                    if (err) console.log(err);
                });

                jsontocsv.json2csv(users,(err,csv)=>{
                    if(err)
                     throw err;
                     fs.writeFileSync('passangers.csv',csv);
                })
                i++;
                console.log('done');

            }
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
    return;
}
helper(i);



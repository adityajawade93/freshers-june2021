const fs = require("fs");
const fetch = require('node-fetch');
const json_to_csv= require('json-2-csv');

const limitPerPage=500;
const apiUrl="https://api.instantwebtools.net/v1/passenger";

const getUsers = async function(pageNo = 1) {

let actualUrl=apiUrl + `?page=${pageNo}&size=${limitPerPage}`;
var apiResults=await fetch(actualUrl)
.then(resp=>{
return resp.json();
});

return apiResults;

}

const getEntireUserList = async function(pageNo = 0) {
  let i=0;
  let results = [];
  for(i=0;i<18;i++)
  {
    result = await getUsers(pageNo);
    console.log("Retreiving data from API for page : " + pageNo);
    results.push(result);
    pageNo++;
  }
  if(i==18)
  {
    console.log("The result is:"+results);
     return results;
  }
};

(async ()=>{
  console.log("hii");
  const entireList=await getEntireUserList();
  console.log(JSON.stringify(entireList));
  fs.writeFile("passengers.json", JSON.stringify(entireList), err => {
     
    // Checking for errors
    if (err) throw err; 
   
    console.log("Done writing"); // Success
  });
  json_to_csv.json2csv(entireList, (err, csv) => {
    if (err) {
        throw err;
    }
    fs.writeFileSync('passengers.csv',csv);
});
})();


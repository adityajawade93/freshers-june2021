// create a file called callbackApiCall.js in this file fetch airline 8, 
 // once you get data fetch airline 9 using promise

 const axios = require('axios');

 const airline9 = axios.get('https://api.instantwebtools.net/v1/airlines/9');

 const airline8 = axios.get('https://api.instantwebtools.net/v1/airlines/8');

 airline8
 .then((res)=>{
     console.log(res.data);
     return airline9;
 })
 .then(resp => console.log(resp.data))
 .catch(err => console.error(err.message));

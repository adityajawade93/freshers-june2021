// create a file called callbackApiCall.js in this file fetch airline 8, 
 // once you get data fetch airline 9 using callback

 const axios = require('axios');

 axios
 .get('https://api.instantwebtools.net/v1/airlines/8')
 .then((res)=>{
     console.log(res.data);
     axios.get('https://api.instantwebtools.net/v1/airlines/9')
        .then(resp => console.log(resp.data))
 })
 .catch(err => console.error(err));

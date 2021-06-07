 // using axios and promise
  
 var axios = require('axios');
  
 var options = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
   };

 axios(options)
 .then(function (response) {
  console.log(response.data);
 })
 .catch(function (error) {
  console.log(error);
 });
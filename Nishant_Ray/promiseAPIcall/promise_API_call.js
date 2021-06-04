var options = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
   };
   var options1 = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
   };

   var axios = require('axios');

axios(options)
.then(function (response) {
  console.log(response.data);
  axios(options1)
  .then(function(response){
     console.log(response.data);
  })
  .catch(function(error){
        console.log(error);
  });
})
.catch(function (error) {
  console.log(error);
});
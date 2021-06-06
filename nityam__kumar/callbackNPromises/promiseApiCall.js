// JSON stringify and parse

// using axios and promise

var axios = require('axios');
var options = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
  };
var options2 = {
      'method': 'GET',
      'url': 'https://api.instantwebtools.net/v1/airlines/9',
      'headers': {}
};





 
    
axios(options)
.then(function (response) {
    console.log(response.data);
  return axios(options2);
})
.then(function(response){
    console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});


function gettravel8() {
    return axios.get('https://api.instantwebtools.net/v1/airlines/8');
  }
function gettravel9() {
    return axios.get('https://api.instantwebtools.net/v1/airlines/9');
}
  
Promise.all([gettravel8(), gettravel9()])
    .then(function (results) {
      const acct = results[0];
      const perm = results[1];
      console.log(acct.data);
      console.log(perm.data);
    })
    .catch(function (error) {
          console.log(error);
    });
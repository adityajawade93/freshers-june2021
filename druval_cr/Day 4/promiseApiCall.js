var axios = require('axios');

var api1 = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};

var api2 = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};

axios(api1)
.then((response) => {
    console.log(response.data);
    return axios(api2);  
})
.then((response) => {
    console.log(response.data);
})
.catch(function(error){
    console.log(error);
})
.catch(function(error){
    console.log(error);
})
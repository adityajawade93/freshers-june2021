var axios = require('axios');

var airlines_8 = {
    'method' : 'get',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};
var airlines_9 = {
    'methd' : 'get',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};

axios(airlines_8)
.then((response) => {
    console.log(response.data);
    return axios(airlines_9)    
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
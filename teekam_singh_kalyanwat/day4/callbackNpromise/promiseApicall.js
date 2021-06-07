var request = require('request');
var options1 = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};

var options2 = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};


var axios = require('axios');

axios(options1)
    .then(function (response) {
        console.log(response.data);
        return axios(options2);
    })
    .then(function (response){
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

// axios(options2)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
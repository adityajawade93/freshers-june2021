var axios = require('axios');
var options = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
   };

var second = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {} 
};
 axios(options).then(function (response) {
    console.log(response.data);
    }).then(axios(second).then(function (response) {
        console.log(response.data);
        }))
    .catch(function (error) {
    console.log(error);
});

//     axios(options).then(function (response) {
//         console.log(response.data);
//         })
//         .catch(function (error) {
//         console.log(error);
// });


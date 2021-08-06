// create a file called promiseApiCall.js in this file fetch airline 8, 
//once you get data fetch airline 9 using promise

var axios = require('axios');

var options = {
    'methd' : 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};
var options2 = {
    'methd' : 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};

// method-1
axios(options)
.then((response) => {
    console.log("First Then");
    console.log(response.data);
    return axios(options2)    
})
.then((response) => {
    console.log("Second Then");
    console.log(response.data);
})
.catch(function(error){
    console.log(error);
})
.catch(function(error){
    console.log(error);
})

// method-2
// axios(options)
// .then((response) => {
//     console.log("First Then");
//     console.log(response.data);
//     return axios(options2)
//     .then((response) => {
//         console.log("Second Then");
//         console.log(response.data);
//     })
// })
// .catch(function(error){
//     console.log(error);
// })
// .catch(function(error){
//     console.log(error);
// })

// method-3
// axios(options)
// .then((response) => {
//     console.log("First Then");
//     console.log(response.data);
//     axios(options2)   
//     .then((response) => {
//         console.log("Second Then");
//         console.log(response.data);
//     }) 
// })
// .catch(function(error){
//     console.log(error);
// })
// .catch(function(error){
//     console.log(error);
// })
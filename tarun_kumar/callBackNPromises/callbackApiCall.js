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

request(options1, function (error, response) {
 if (error) throw new Error(error);
 console.log(JSON.parse(response.body));

 request(options2, function (error, response) {
    if (error) throw new Error(error);
    console.log(JSON.parse(response.body));
   });
   
});

   

// JSON.parse is to convert data/response  received from the request we made via the url 
//to object in javascript.  the data is received as json string/object and should be converted to JS object so that we
// can use it.

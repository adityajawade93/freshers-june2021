 // create a file called callbackApiCall.js in this file fetch airline 8, 
 // once you get data fetch airline 9 using callback
  
 var request = require('request');

var options1 = {
    'methd' : 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};

var options2 = {
    'methd' : 'POST',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};

request(options1, function(error, response){
    if(error){
        throw new Error(error);
    }
    console.log(JSON.parse(response.body));
    
    request(options2, function(error, response){
        if(error){
            throw new Error(error);
        }
        console.log(JSON.parse(response.body));
    });
});
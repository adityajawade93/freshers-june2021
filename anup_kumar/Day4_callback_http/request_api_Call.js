var request = require('request');

var options = {
    'methd' : 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/0',
    'headers': {}
};

request(options, function(error, response){
    if(error){
        throw new Error(error);
    }
    console.log(JSON.parse(response.body));
});
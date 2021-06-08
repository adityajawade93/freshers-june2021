var request = require('request');

var airlines_8 = {
    'methd' : 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers': {}
};

var airlines_9 = {
    'methd' : 'POST',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
};

request(airlines_8, (error, response)=>{
    if(error){
        throw new Error(error);
    }
    console.log(JSON.parse(response.body));
    
    request(airlines_9,(error, response)=>{
        if(error){
            throw new Error(error);
        }
        console.log(JSON.parse(response.body));
    });
});
var request = require('request');

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
 
request(api1, function (error, res) {
    if (error) throw new Error(error);
    else{
        console.log(JSON.parse(res.body));
        request(api2, function(error,res){
            if(error) throw new Error(error);
            console.log(JSON.parse(res.body));
        });
    }
});
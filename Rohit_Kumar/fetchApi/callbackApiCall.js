var request = require('request');
var options = {
 'method': 'GET',
 'url': 'https://api.instantwebtools.net/v1/airlines/8',
 'headers': {}
};

var somthing = {
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers': {}
   };

let x= function()
{
    request(somthing, function (error, response) {
        if (error) throw new Error(error);
        console.log(JSON.parse(response.body));
       });
       
}

let y = function(callback)
{
    request(options, function (error, response) {
        if (error) throw new Error(error);
        else{
        console.log(JSON.parse(response.body))
        callback()    }
       });
}
y(x);
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(JSON.parse(response.body));
//    });
   
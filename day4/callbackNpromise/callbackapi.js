var request = require('request');

var option1 ={
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/8',
    'headers':{}
};

var option2 ={
    'method': 'GET',
    'url': 'https://api.instantwebtools.net/v1/airlines/9',
    'headers':{}
};

request(option1, function(err,res,body){
    if(err){
        console.log(err);
    }else{
        console.log(JSON.parse(body));
            request(option2,function(err,res,body){
                if(err){
                    console.log(err);
                }else{
                    console.log(JSON.parse(body));
                }
            })
    }
})

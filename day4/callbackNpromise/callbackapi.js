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
        setTimeout(()=>{
            request(option2,function(err,res,body){
                if(err){
                    console.log(err);
                }else{
                    console.log(JSON.parse(body));
                }
            })
        },4000)
    }
})
// var request = require('request');
// var options = {
//  'method': 'GET',
//  'url': 'https://api.instantwebtools.net/v1/airlines/8',
//  'headers': {}
// };
// var options1 = {
//     'method': 'GET',
//     'url': 'https://api.instantwebtools.net/v1/airlines/9',
//     'headers': {}
//    };
 
// request(options, function (error, response) {
//  if (error) throw new Error(error);
//  else{
//  console.log(JSON.parse(response.body));
//      request(options1,function(error,response){
//           if(error) throw new Error(error);
//           console.log(JSON.parse(response.body));
//      });
//  }
// });
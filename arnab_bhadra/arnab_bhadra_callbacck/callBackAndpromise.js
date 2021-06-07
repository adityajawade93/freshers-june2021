var request = require("request");
//using promises
const requestCallback= function (urlInfo){
    const callback=function(resolve,reject){
        var options1 = {
            'method': 'GET',
            'url': urlInfo,
            'headers': {}
        };
        request(options1,function(err,res){
            if(err){
                reject( new Error("Error In fetching Data"));
            }
            else{
                //console.log(JSON.parse(res.body));
                resolve(JSON.parse(res.body));
            }
        });
    }
    return new Promise(callback);

}
requestCallback('https://api.instantwebtools.net/v1/airlines/8').then((data)=>{
    console.log("In promises: \n"+JSON.stringify(data)+"\n");
    return requestCallback('https://api.instantwebtools.net/v1/airlines/6');
}).then((data)=>{
    console.log("In promises: \n"+JSON.stringify(data)+"\n");
}).catch((error)=> {
    console.log("error occured "+error)
})

const option = function(urlInfo){
    var option ={
        'method': 'GET',
        'url': urlInfo,
        'headers': {}
    }
    return option;
};
// Using axios
var axios = require('axios');
axios(option('https://api.instantwebtools.net/v1/airlines/8'))
.then(function (response) {
    console.log("In axions\n"+ JSON.stringify(response.data)+"\n");
    axios(option('https://api.instantwebtools.net/v1/airlines/6')).
    then(function( res){
        console.log("In axions\n"+ JSON.stringify(res.data)+"\n");
    })
}).catch(function (error) {
    console.log(error);
});

// // Using CallBack


// const requestUsingCallBack = function(urlInfo){
//     return function(){
//         var option={
//             'method': 'GET',
//             'url': urlInfo,
//             'headers': {}
//         }
//         request(option,function(error,response){
//             if(error){
//                 throw "Error";
//             }
//             else{
//                 console.log(response.body);
//             }
//         })
//     }

// }
const requestUsingCallBack =function(urlInfo) {
    var option={
        'method': 'GET',
        'url': urlInfo,
        'headers': {}
    }
    request(option,function(error,response){
        if(error){
            throw "Error";
        }
        else{
            console.log(response.body);
        }
    })
}
url='https://api.instantwebtools.net/v1/airlines/8'
const requestUsingCallBacktogether= function(url,methods){
    requestUsingCallBack(url);
    url2='https://api.instantwebtools.net/v1/airlines/6'
    methods(url2);
}
requestUsingCallBacktogether(url,requestUsingCallBack);


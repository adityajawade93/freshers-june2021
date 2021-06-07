const request = require('request')
const axios = require('axios')

// using request

var req = (option,responsefun) =>{
    return request(option,responsefun)
}

var callbackapi  = (responsefunc,callback) =>{

    let options = {
        method : 'GET',
        url:'https://api.instantwebtools.net/v1/airlines/8'
    }

    console.log(options.url)
    if(callback(options,responsefunc)){
        options.url = 'https://api.instantwebtools.net/v1/airlines/9'
        callback(options,responcfunc)
    }
}
var responcfunc =(error,response) =>{

    if(error){
        console.log(error)
    }
    console.log(JSON.parse(response.body))
}

callbackapi(responcfunc,req)


const request = require('request')
const axios = require('axios')


// //using request
// var options = {
//     method : 'GET',
//     url:'https://api.instantwebtools.net/v1/airlines/8'
// }

// var promiseapi =  (option) =>{
//     const ap = (resolve,reject) =>{
//         request(option,(error,response) =>{

//             if(error){
//                  reject(new Error(error))
//             }
//             resolve(response.body)
//         })
//     }
//     return new Promise(ap)
// }

// promiseapi(options)
// .then((response) =>{
//     console.log('using request')
//     console.log(JSON.parse(response))
//     options.url ='https://api.instantwebtools.net/v1/airlines/9'
//     return promiseapi(options)
// })
// .then((response2) =>{
//     console.log(JSON.parse(response2))
// })
// .catch((error) =>{
//     console.log(error)
// })


// using axios

var options2 = {
    method : 'GET',
    url:'https://api.instantwebtools.net/v1/airlines/8'
}
axios(options2)
.then((response) =>{
    console.log('using axios')
    console.log(response.data)
    options2.url ='https://api.instantwebtools.net/v1/airlines/9'
    return axios(options2)
})
.then((response2) =>{
    console.log(response2.data)
})
.catch((error) =>{
    console.log(error)
})


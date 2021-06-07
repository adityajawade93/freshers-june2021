
const axios = require('axios');

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

axios(option1)
.then((response)=>{
    console.log(response.data);
}).then(axios(option2)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
)
.catch((err)=>{
    console.log(err);
})
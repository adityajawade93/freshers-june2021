const request = require('request');


const fetchData = ()=>{

    let options = {
  
         'method' : 'GET',
         'url': 'https://api.instantwebtools.net/v1/airlines/8',
          'headers': {}
    }
    request(options,(error,response)=>{
           
        if(error)
         console.log(error);
         else
         console.log(JSON.parse(response.body));

    });

}
fetchData();
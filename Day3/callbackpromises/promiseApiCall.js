const axios = require('axios');


const fetchData = async()=>{

    let options = {
  
        'method' : 'GET',
        'url': 'https://api.instantwebtools.net/v1/airlines/9',
         'headers': {}
   };
   try{

    let data = await axios(options);
    console.log(data);
    options.url = 'https://api.instantwebtools.net/v1/airlines/10'
    let data2 = await axios(options);co
    console.log(data2);
   }
   catch(e)
   {
       console.log(e);
   }


};

fetchData();
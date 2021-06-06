const axios = require('axios');


const fetchData = async()=>{

    let options = {
  
        'method' : 'GET',
        'url': 'https://api.instantwebtools.net/v1/airlines/8',
         'headers': {}
   };
   try{

    let data = await axios(options);
    console.log(data);

   }
   catch(e)
   {
       console.log(e);
   }


};

fetchData();
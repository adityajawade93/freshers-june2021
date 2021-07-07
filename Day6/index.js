const http = require('http');
const routes = require('./routes');

http.createServer((req,res)=>{

    if(req.method==='POST'&&req.url==='/convert')
      routes.convert(req,res);
    

}).listen(3000,()=>{
 
    console.log("Server created succesfully");

})
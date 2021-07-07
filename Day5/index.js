const http = require('http');
const routes = require('./routes');

http.createServer((req,res)=>{

    if(req.method==='POST'&&req.url==='/todo')
      routes.createtodo(req,res);
    if(req.method==='GET'&&req.url==='/todo')  
    {
        routes.gettodo(req,res);
    }
    if(req.method==='PUT'&&req.url.match('/todo/').length>0)
    {
        routes.updatetodo(req,res);
    }
    if(req.method==='DELETE'&&req.url.match('/todo/').length>0)
    {
        routes.deletetodo(req,res);
    }

}).listen(3000,()=>{
 
    console.log("Server created succesfully");

})
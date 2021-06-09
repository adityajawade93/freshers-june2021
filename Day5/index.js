const http = require('http');
const routes = require('./routes');

http.createServer((req,res)=>{

    if(req.method==='POST'&&req.url==='/todo')
      routes.createNotes(req,res);
    if(req.method==='GET'&&req.url==='/todo')  
    {
        routes.getNotes(req,res);
    }
    if(req.method==='PUT'&&req.url.match('/todo/').length>0)
    {
        routes.updateNotes(req,res);
    }
    if(req.method==='DELETE'&&req.url.match('/todo/').length>0)
    {
        routes.deleteNotes(req,res);
    }

}).listen(3000,()=>{
 
    console.log("Server created succesfully");

})
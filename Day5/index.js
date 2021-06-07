const http = require('http');
const routes = require('./routes');
const url = require('url');

http.createServer((req,res)=>{

    if(req.method==='POST'&&req.url==='/createNotes')
      routes.createNotes(req,res);
    if(req.method==='GET'&&req.url==='/getNotes')  
    {
        routes.getNotes(req,res);
    }
    if(req.method==='PUT'&&url.parse(req.url,true).pathname==='/updateNotes')
    {
        routes.updateNotes(req,res);
    }
    if(req.method==='DELETE'&&url.parse(req.url,true).pathname==='/deleteNotes')
    {
        routes.deleteNotes(req,res);
    }

}).listen(3000,()=>{
 
    console.log("Server created succesfully");

})
let http = require('http');
const routes = require('./routes');

http.createServer((req,res)=>{
    if(req.method==='GET' && req.url==='/getTodo'){
        routes.getTodo(req,res);
    }
    if(req.method==='POST' && req.url==='/postTodo'){
        routes.postTodo(req,res);
    }

    // URL parsing for the pathname will give the path section of the url after the host and before the querry
    if(req.method==='PUT' && url.parse(req.url).pathname==='/updatedTodo'){
        routes.updatedTodo(req,res);
    }
    if(req.method==='PUT' && url.parse(req.url).pathname==='/updatedTodo'){
        routes.updatedTodo(req,res);
    }
})
.listen(3000,()=>{
    console.log('server is listening at Port 3000');
})
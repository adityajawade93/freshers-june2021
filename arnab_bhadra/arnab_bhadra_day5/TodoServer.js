const http = require("http");
const uuid = require("uuid");
var toDoArray=[]
http.createServer((req,res)=>{
    if(req.method==="GET" || req.method==="POST" || req.method==="DELETE" || req.method==="PUT"){
        httpServerActions(req,res);
    }
    else{
        console.log("Incorrect");
    }

}).listen(3000,()=>{
    console.log("Todo Server started at port 3000");
});

function httpServerActions(req,res){
    let body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on("end", _any => {
        if(req.headers['content-type'] === 'application/json' && body!="" ){
            req.body = JSON.parse(body);
        }
        else{
            req.body = body;
        }
        performAction(req,res);
    });
}

var validateJOSN = (jsonbody) =>{
    //let json= JSON.parse(jsonbody);
    if(jsonbody.Title===undefined){
        return false;
    }
    let id=uuid.v4();
    let Title=jsonbody.Title;
    let date= new Date();
    let completed = false;
    var jsonobejct ={
        'id':id,
        'date':date,
        'completed': completed,
        'Title':jsonbody.Title
    } 
    return jsonobejct;
}

function performAction(req,res){
    
    if (req.method==="POST" && req.url==="/todo" && req.headers['content-type'] === 'application/json') {
        var jsonValidate=validateJOSN(req.body)
        if(jsonValidate===false){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("Provided data is incorrect");
        }
        toDoArray.push(jsonValidate);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("Successfully toDo is added");
    } 
    else if(req.method==="GET" && req.url==="/todo"){
        if(toDoArray.length>0){
            //res.writeHead(200, { 'Content-Type': 'application/json' });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            var dataString="";
            toDoArray.forEach((data)=>{
                
                dataString+=JSON.stringify(data)+"  ";
            })
            res.write(dataString);
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No todo item");
        }
        res.end();
    }
    else if(req.method==="GET" && req.url.match("/todo/+").length>0){
        var id=req.url.substring(6);
        var flag=false;
        console.log("ABC",id);
        if(id===""){
            console.log("In empty",id);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No Id provided");            
        }
        else{
            console.log("In loop",id);
            toDoArray.forEach((data)=>{
                if(id==data.id){
                    flag=true;
                    res.writeHead(200, { 'Content-Type': 'application/json' });    
                    res.write(JSON.stringify(data));
                    
                }

            });
            if(!flag){
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Data provided is not availabe"); 
                
            }
        }
        res.end();
        
    }
    else if(req.method==="DELETE" && req.url.match("/todo/+").length>0){
        var id=req.url.substring(6);
        console.log(req.url,id);
        let flag=false;
        if(id===""){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No Id provided");            
        }
        else{
            toDoArray.forEach((data)=>{
                if(id==data.id){
                    flag=true;
                    var index =toDoArray.indexOf(data);
                    console.log(index)
                    toDoArray=toDoArray.slice(index,1);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write("Delete successfully"); 
                    
                }
            });
            console.log(toDoArray)
            if(!flag){
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Data provided not availabe "); 
            }
        }
        res.end();
    }
    else if(req.method==="PUT" && req.url.match("/todo/+").length>0  && req.headers['content-type'] === 'application/json'){
        var id=req.url.substring(6);
        let flag=false;
        

        if(id===""){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No Id provided");            
        }
        else{
            toDoArray.forEach((data)=>{
                
                if(id==data.id && flag===false){
                    flag=true;
                    var index =toDoArray.indexOf(data);
                    if(req.body.Title!==undefined){
                        toDoArray[index].Title=req.body.Title;
                    }
                    if(req.body.completed!==undefined){
                        toDoArray[index].completed=req.body.completed;
                    }
                    if(req.body.data!==undefined){
                        toDoArray[index].data==req.body.data;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write("Update successfully"); 
                    
                }

            });  
            if(!flag){
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Data provided not availabe ");                 
            }         
        }



    }
    else {
        //console.log(req.method,req.url);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("Invalid URL")
    }
    res.end();
}
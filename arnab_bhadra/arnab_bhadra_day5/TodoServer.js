const http = require("http");
const uuid = require("uuid");
var toDoArray=[]
http.createServer((req,res)=>{
    if(req.method==="GET" || req.method==="POST" || req.method==="DELETE" || req.method==="PUT"){
        httpServerActions(req,res);
    }
    else{
        console.log("Incorrect method");
        res.writeHead(400,{ 'Content-Type': 'text/plain' });
        res.end("Incorrect Request");
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

var noIdProvidedmessage=(req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("No Id provided");  
}

var dataNotPresentMessage=(req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Data provided is not availabe");   
}
var createTodo= (req,res)=>{
    var jsonValidate=validateJOSN(req.body)
    if(jsonValidate===false){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("Provided data is incorrect");
    }
    toDoArray.push(jsonValidate);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Successfully toDo item is added");
}

var getTodoList =(req,res)=>{
    if(toDoArray.length>0){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(toDoArray));    
    }
        
    else{
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("No todo item");
    }
        
}

var getTodoById = (req,res)=>{
    var id=req.url.substring(6);
    var flag=false;
    //console.log("ABC",id);
    if(id===""){
        noIdProvidedmessage(req,res);           
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
            dataNotPresentMessage(req,res);
            
        }
    }
    
}

var deleteToDoById= function(req,res){
    var id=req.url.substring(6);
    if(id===""){
        noIdProvidedmessage(req,res);               
    }
    var count =0;
    var index=-1;
    var dummyList=[];
    toDoArray.forEach((data)=>{
        if(id==data.id){
            index=count;
        }
        else{
            dummyList.push(data)
        }
        count++;
    });
    if(index==-1){
        dataNotPresentMessage(req,res);
    }   
    else{
        toDoArray.splice(index,1);
        //toDoArray=dummyList;
        console.log(index,toDoArray);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(" Delete successfully "); 
    }
}

var updateTodoByid = function(req,res){
    var id=req.url.substring(6);
    let flag=false;
    

    if(id===""){
        noIdProvidedmessage(req,res);            
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
            dataNotPresentMessage(req,res);                
        }         
    }


}

var callBackAction =(req,res, action)=>{
    action(req,res);
}

function performAction(req,res){
    
    if (req.method==="POST" && req.url==="/todo" && req.headers['content-type'] === 'application/json') {
        callBackAction(req,res,createTodo);
    } 
    else if(req.method==="GET" && req.url==="/todo"){
        callBackAction(req,res,getTodoList);
    }
    else if(req.method==="GET" && req.url.match("/todo/+").length>0){
        callBackAction(req,res,getTodoById);      
    }
    else if(req.method==="DELETE" && req.url.match("/todo/+").length>0){
        callBackAction(req,res,deleteToDoById);
    }
    else if(req.method==="PUT" && req.url.match("/todo/+").length>0  && req.headers['content-type'] === 'application/json'){
        callBackAction(req,res,updateTodoByid);
    }
    else {
        //console.log(req.method,req.url);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("Invalid URL")
    }
    res.end();
}
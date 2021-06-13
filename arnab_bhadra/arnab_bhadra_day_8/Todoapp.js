const koa =require('koa');
const koaRouter = require('@koa/router');
const dateFormat = require('dateformat');
const uuid= require('uuid');
const app = new koa();
const appRouter = new koaRouter();

var bodyParser = require('koa-bodyparser');
var todoList=[]

const noItemMessage= function(){
    return "No Todo item exits for givern id"
}

const dataNotavailabeMessage=()=>{
    return "No todo item. Create one";
}

const invalidInputTypeMessage =()=>{
    return "Invalid Input Type";
}
const validateDate=(date)=>{
    //console.log(date);
    if(date.match("^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}")===null){
        
        return false;
    }
    try{
        
        var newDate=new Date(date);
        var today= new Date();
        
        if(newDate>today){
            
            return false;
        }
        else{
            
            return dateFormat(newDate,'mm/dd/yyyy');
        }
    }
    catch{
        
        return false;
    }
    
}
const validateTodo=(jsonbody)=>{
    try{
        
        if(jsonbody.Title===undefined || jsonbody.Title===""){
            return false;
        }
        let id=uuid.v4();
        let Title=jsonbody.Title;
        if(Title===""){
            return false;
        }
        let date= dateFormat(new Date(),"mm/dd/yyyy");
        let completed = false;
        var jsonobejct ={
            'id':id,
            'date':date,
            'completed': completed,
            'Title':Title
        } 
        return jsonobejct;
    }
    catch(e){
        //console.log(e);
        return false;
    }
}

appRouter.get('/', (ctx, next) => {
    ctx.body = 'Todo app';
});

appRouter.post("/todo",(ctx,next)=>{
    
    if(ctx.request.headers["content-type"]==='application/json'){
        let requestBody=ctx.request.body;
        var inputData=validateTodo(requestBody)
        if(inputData===false){
            ctx.body="Title is not present in input";
        }
        else{
            todoList.push(inputData);
            ctx.body="Todo item created Successfully with id : "+inputData.id;
        }
    }
    else{
        ctx.body=invalidInputTypeMessage();
    }
    
});

appRouter.get("/todo",(ctx,next)=>{
    //console.log(todoList.length);
    if(todoList.length===0){
        ctx.body=dataNotavailabeMessage();
    }
    else{
        //ctx.body=JSON.stringify(todoList);
        ctx.body=todoList;
    }
});

appRouter.get("/todo/:id",(ctx,next)=>{
    const id=ctx.params.id;
    let flag=false;
    if(todoList.length===0){
        ctx.body=dataNotavailabeMessage()

    }
        else{
        todoList.forEach((todoItem)=>{
            if(id==todoItem.id){
                flag=true;
                ctx.body=todoItem;
            }
        });
        if(!flag){
            ctx.body=noItemMessage();
        }
    }
});

appRouter.put("/todo/:id",(ctx,next)=>{
    const id=ctx.params.id;
    let flag=false;
    var message="";
    if(ctx.request.headers["content-type"]==='application/json'){
        
        todoList.forEach((todoItem)=>{
            if(id===todoItem.id){
                flag=true;
                let updateflag=false;
                if(ctx.request.body.Title!==undefined && ctx.request.body.Title!==""){
                    todoItem.Title=ctx.request.body.Title;
                    updateflag=true;
                    message+="Title updated\n";
                }
                if(ctx.request.body.date!==undefined && ctx.request.body.date!==""){
                    
                    var newDate=validateDate(ctx.request.body.date);
                    if(newDate!==false){
                        todoItem.date=newDate;
                        updateflag=true;
                        message+="Date updated\n";
                    }
                    else{
                        message+="Invalid Date format sould be (mm/dd/yyyy)\n"
                    }
                }
                if(ctx.request.body.completed===true || ctx.request.body.completed===false){
                    todoItem.completed=ctx.request.completed;
                    updateflag=true;
                    message+="Compete status updated\n";
                }
                if(updateflag){
                    ctx.body=message+"Update Complete";
                }
                else{
                    ctx.body="Item Found But No Field Updated"
                }
                
            }
        });
        if(!flag){
            ctx.body=noItemMessage();
        }
    }
    else{
        ctx.body= invalidInputTypeMessage();
    }
    

});

appRouter.delete("/todo/:id",(ctx,next)=>{
    const id=ctx.params.id;
    if(todoList.length===0){
        ctx.body="No item to delete";

    }
    else{
        let index=-1;
        for(let i=0;i<todoList.length;i++){
            if(todoList[i].id===id){
                index=i;
                break;
            }
        } 
        if(index!==-1){
            todoList.splice(index,1);
            ctx.body="Deleted todo item Successfully";
        }
        else{
            ctx.body=noItemMessage();
        }
    }
});


app.use(bodyParser())
app.use(appRouter.routes())
app.use(async ctx => {
    ctx.body = 'Page Not Found';
  });

module.exports={app,validateDate,validateTodo,};

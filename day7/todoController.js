const uuid = require('uniqid');


class Notes{

    constructor(date,title,content)
    {
        this.id = uuid('N');
        this.date = date;
        this.title = title;
        this.content = content;
    }
    
}

var todomap = new Map();

exports.createtodo = async(ctx)=>{

     try{
          let req = ctx.request;
          if(req.body.title==null)
           {
            ctx.response.status=400;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Title is missing"
            }
            return;
           }
           let notes = new Notes(new Date(),req.body.title,req.body.content);
           todomap.set(notes.id,notes);
           ctx.response.status=200;
           ctx.body={
               "msg": "Notes Created"
           }

     }
     catch(e)
     {
         console.log(e.stack);
         ctx.response.status=401;
         ctx.body={
            "msg": "something wrong happens"
        }
            
     }
}


exports.gettodo= async(ctx)=>{

    ctx.response.status=200;
    ctx.response.type = 'application/json';
    let todoList =[];
    for(let [key,value] of todomap)
      todoList.push(value);
    ctx.body=JSON.stringify(todoList);
       
}

exports.updatetodo = async(ctx)=>{

      
      try{
        let id = ctx.request.params.id;
        if(typeof id !=='string' || id[0]!=='N')
        {
            ctx.response.status=400;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid Id"
            }
            return;
        }
        if(todomap.get(id)==null)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Notes not found"
            }
        }
        else{
            let req = ctx.request;
            if(req.body.title)
             todomap.get(id).title=req.body.title;
            if(req.body.content)
            todomap.get(id).content=req.body.content;
            ctx.response.status=200;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Notes Updated"
            }
        }
      }
      catch(e)
      {
        console.log(e.stack);
        ctx.response.status=400;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
      }

}

exports.deletetodo = async(ctx)=>{

    try{
       
        
        let id = ctx.request.params.id;
        if(typeof id !=='string' || id[0]!=='N')
        {
            ctx.response.status=400;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid Id"
            }
            return;
        }

        if(todomap.get(id)==null)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
            "msg": "Notes not Found"
            }
        }
        else
        {
            todomap.delete(id);
            ctx.response.status=200;
            ctx.response.type = 'application/json';
            ctx.body={
               "msg": "Notes deleted"
            }
        }

    }
    catch(e)
    {
        console.log(e.stack);
        ctx.response.status=400;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
    }
}

exports.gettodobyid = async(ctx)=>{

    try{
       
        
        let id = ctx.request.params.id;
        if(typeof id !=='string' || id[0]!=='N')
        {
            ctx.response.status=400;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Invalid Id"
            }
            return;
        }

        if(todomap.get(id)==null)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
            "msg": "Notes not Found"
            }
        }
        else
        {
            
            ctx.response.status=200;
            ctx.response.type = 'application/json';
            ctx.body=todomap.get(id);
        }

    }
    catch(e)
    {
        console.log(e.stack);
        ctx.response.status=400;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
    }
       

}
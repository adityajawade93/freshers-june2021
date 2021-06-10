const uuid = require('uniqid');
const url = require('url');

class Notes{

    constructor(date,title,content)
    {
        this.id = uuid('N');
        this.date = date;
        this.title = title;
        this.content = content;
    }
    
}

var list = [];

exports.createtodo = async(ctx)=>{

     try{
          let req = ctx.request;
          if(req.body.title==null)
           {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Title is missing"
            }
            return;
           }
           let notes = new Notes(new Date(),req.body.title,req.body.content);
           list.push(notes);
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

    ctx.response.status=300;
    ctx.response.type = 'application/json';
    ctx.body=JSON.stringify(list);
       
}

exports.updatetodo = async(ctx)=>{

      
      try{
        let id = ctx.url.substring(6);
        var i=0;
        for(i=0;i<list.length;i++)
        {
            if(list[i].id==id)
             break;
        }
        if(i==list.length)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
                "msg": "Notes not found"
            }
        }
        else
        {
            let req = ctx.request;
            if(req.body.title)
             list[i].title=req.body.title;
            if(req.body.content)
            list[i].content=req.body.content; 
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
        ctx.response.status=401;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
      }

}

exports.deletetodo = async(ctx)=>{

    try{
       
        
        let id = ctx.url.substring(6);
        var i=0;
        for(i=0;i<list.length;i++)
        {
            if(list[i].id==id)
             break;
        }
        if(i==list.length)
        {
            ctx.response.status=404;
            ctx.response.type = 'application/json';
            ctx.body={
            "msg": "Notes not Found"
        }  
        }
        else
        {
            list.splice(i,1);
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
        ctx.response.status=401;
        ctx.response.type = 'application/json';
        ctx.body={
            "msg": "Something wrong happens"
        }
    }
}
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

exports.createNotes = async(req,res)=>{

     try{
          await attachBody(req,res);
          if(req.body.title==null)
           {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Title is missing');
            res.end();
            return;
           }
           let notes = new Notes(new Date(),req.body.title,req.body.content);
           list.push(notes);
           res.writeHead(200, { 'Content-Type': 'text/html' });
           res.write('Notes Created');
           res.end();

     }
     catch(e)
     {
         console.log(e.stack);
         res.writeHead(401, { 'Content-Type': 'text/html' });
         res.write('Something wrong happens');
         res.end();
            
     }
}


exports.getNotes = async(req,res)=>{

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
       
}

exports.updateNotes = async(req,res)=>{

      
      try{
        let id = req.url.substring(13);
        console.log(id);
        var i=0;
        for(i=0;i<list.length;i++)
        {
            if(list[i].id==id)
             break;
        }
        if(i==list.length)
        {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();   
        }
        else
        {
            await attachBody(req,res);
            if(req.body.title)
             list[i].title=req.body.title;
            if(req.body.content)
            list[i].content=req.body.content; 
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Notes Updated');
            res.end();
        }
      }
      catch(e)
      {
        console.log(e.stack);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.write('Something wrong happens');
        res.end();
      }

}

exports.deleteNotes = async(req,res)=>{

    try{
       
        
        let id = req.url.substring(13);
        console.log(id);
        //let id = query.id;
        var i=0;
        for(i=0;i<list.length;i++)
        {
            if(list[i].id==id)
             break;
        }
        if(i==list.length)
        {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Notes Not Found');
            res.end();   
        }
        else
        {
            list.splice(i,1);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Notes deleted');
            res.end();
        }

    }
    catch(e)
    {
        console.log(e.stack);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.write('Something wrong happens');
        res.end();

    }
}

let attachBody = (req,res)=>{

    return new Promise((resolve,reject)=>{

        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on("end", () => {
            if (req.headers['content-type'] === 'application/json') {
                req.body = JSON.parse(body);
                resolve('request body attached')
            } else {
                reject("request body is not of json type")
            }
           
        });

    });
}
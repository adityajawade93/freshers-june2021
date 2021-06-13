let fs=require("fs");
let url=require("url");
let http=require("http");
let csvtojson=require("csvtojson");

const port =3001;
http.createServer(
    (req,res)=>
    {
        if(req.method=='GET' ||req.method=='POST' ||req.method=='DELETE'||req.method=='PUT')
        // res.end("correct request");
        return handlerequest(req,res);
        else 
        {
            res.end("Error occured invalid request");
        }
    }
).listen(port ,()=>
{
    console.log("server started at port",port);
})

let handlerequest=(req,res)=>
{
    if(req.method=="GET")
    {
        if(req.url==="/")
        {
            res.writeHead(200); // set status code
            res.end("Welcome to Server");
        }
        else if(req.url.match(/\/.+/))
        {
            var filename=req.url.substring(1);
            path='./'+filename+'.csv';
            console.log(req.url,path)
        }
    }
}

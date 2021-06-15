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
        if(req.url.match(/\/+/))
        {
            var filename = req.url.substring(1);

            if(filename==="")
            {
                res.writeHead(200);
                res.end("Please enter some file name");   
            }
            path = './' + filename +  '.csv';
            console.log(req.url,path);
            try {
                if (fs.existsSync(path)) { 
                    var data = "";               
                    csvtojson()
                    .fromFile(path)
                    .then((jsonData) => {
                        console.log(jsonData);
                        data += JSON.stringify(jsonData);
                        fs.writeFile(filename + '.json', data, (err) => {
                            if (err) throw err;
                        });
                    });
                    res.writeHead(200);
                    return res.end(`${filename}.csv has been converted`);
                }
                else{
                    res.writeHead(404);
                    return res.end("error occured"); 
                }
            } catch(err) {
                console.error(err)
            }
        }
    }
    else
    {
        res.writeHead(200);
        res.end(`hey have not implemented ${req.method} method on this API`);
    }
}


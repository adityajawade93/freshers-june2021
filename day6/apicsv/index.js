const http = require('http');
const csvtojson=require('csvtojson');
const fs= require('fs');

http.createServer((req,res)=>{
    if(req.method==='GET'){
        handlerequest(req,res);
    }else{
        attachBodyToRequest(req,res,handlerequest);
    }
})
.listen(3000,()=>{
    console.log('server listening at 3000')
})

let handlerequest = function(req,res){
    if(req.method==='POST' && req.url==='/convert'){
        if(req.body.filename==null){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('filename missing');
            res.end();
            return;
        }
        const path='./'+req.body.filename+'.csv';
        if(fs.existsSync(path)){
            csvtojson().fromFile(path)
            .then((jsondata)=>{
                console.log(jsondata);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write('CSV coverted to Json and saved')
                res.end();

                fs.writeFile('output.json',JSON.stringify(jsondata),(err)=>{
                    console.log(err);
                })

                console.log('json is saved');
            })
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('filename MISSING');
            res.end();
        }
    }
}

let attachBodyToRequest=function(req,res,callback){
    let body ='';
    req.on('data',(data)=>{
        body+=data;
    });

    req.on("end", _any => {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body);
        } else {
            console.log('Request Body of other mime types');
        }
        callback(req, res);
    });
}
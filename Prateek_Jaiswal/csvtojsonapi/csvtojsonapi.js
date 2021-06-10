const http = require('http')
const fs = require('fs')
const csvtojson =require('csvtojson')

var port = 5001

var server = http.createServer((req,res) =>{

    if(req.method ==="POST"){
        attachbodytorequest(req, res, handlerequest);
    }

}).listen(port, ()=>{
    console.log('port at ', port);
})

var handlerequest = (req,res) => {
    console.log(req.body)
    console.log("got request ==>" ,{
        method: req.method,
        path: req.url,
        contenttype:req.headers['content-type'],
        body:req.body
    })
    if(req.method ==='POST' && req.url ==="/csvtojson"){
        
        let filename = req.body.csvfilename.trim() + ".csv";
        convertfiletojson(req, res, filename);
        

    }
}


var convertfiletojson = (req, res, filename) => {


    fs.access(filename ,(err) =>{

        if(err){
            console.log('file dose not exist');
            res.writeHead(404, { 'content-type': 'text/html' });
            res.write('404 , file not found');
            res.end();
        } else
        {
            csvtojson()
            .fromFile(filename)
            .then( (jsonobj) =>{
                fs.writeFile('converted.json',JSON.stringify(jsonobj),'utf8',(error) =>{
                    console.log(error);
                })
                
            })
 
          
        }
    })
}


var attachbodytorequest = (req, res, callback) => {
    let body = ''

    req.on('data', (data) => {
        body += data
    })
    req.on('end', () => {

        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body)
        } else {
            console.log('requested data is of other mime types')
        }
        callback(req, res)
    })

}
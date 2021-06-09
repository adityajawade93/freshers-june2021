const http = require('http')
const fs = require('fs')
const csvtojson =require('csvtojson')

var port = 3001

var server = http.createServer((req,res) =>{

    if(req.method ==="POST"){
        attachbodytorequest(req,res,handlerequest)
    }

}).listen(port, ()=>{
    console.log('port created at ',port)
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
        
        let filename = req.body.csvfilename.trim()+".csv"
        console.log(filename)

        convertfiletojson(req,res,filename)
        

    }
}


var attachbodytorequest = (req,res,callback) =>{
    let body =''

    req.on('data' ,(data) =>{
        body +=data
    })
    req.on('end',() =>{
        
        if(req.headers['content-type']==='application/json'){
            req.body = JSON.parse(body)
        }else{
            console.log('requested data is of other mime types')
        }
        callback(req,res)
    })
    
}


var convertfiletojson = (req,res,filename) =>{

    fs.access(filename ,(err) =>{

        if(err){
            console.log('this file dosent exist')
            res.writeHead(404,{'content-type':'text/html'})
            res.write('404 ,error file not found')
            res.end()
        }else{
            csvtojson()
            .fromFile(filename)
            .then( (jsonobj) =>{
                fs.writeFile('convertedjson.json',JSON.stringify(jsonobj),'utf8',(error) =>{
                    console.log(error)
                })
                
            }) 

            setTimeout(() =>{
                fs.readFile('convertedjson.json', (err,data) =>{

                   if(err){
                       res.writeHead(404,{'content-type':'application/json'})
                       res.write('not coverted to json file')
                       res.end()
                   }else{
                       console.log(JSON.parse(data))
                       let jsondata =JSON.parse(data)
                       console.log(jsondata)
                       res.writeHead(200,{'content-type':'application/json'})
                       res.end(JSON.stringify(jsondata))
                   }
               })
           },10)

            
           

        }
    })
}
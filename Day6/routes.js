const csvtoJSON = require('csvtojson');
const fs = require('fs');

exports.convert = async(req,res)=>{

    try{

        await attachBody(req,res);
        if(req.body.filename==null)
        {
            res.writeHead(401, { 'Content-Type': 'text/html' });
            res.write('filename missing');
            res.end();
            return;
        }
         const path = './'+req.body.filename+'.csv';
         if(fs.existsSync(path))
           {
               let data = await csvtoJSON().fromFile(path);
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify(data));
       

           }
           else{
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('File is not present in server');
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
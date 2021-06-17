let koa = require('koa');
let koarouter = require('@koa/router');
let bodyparser = require('koa-bodyparser');
let json= require('koa-json')
let app= new koa();
let router= new koarouter();

let fs= require('fs');



app.use(json());
app.use(bodyparser());



router.get('/',(ctx)=>{
    ctx.body= 'welcome'
})

router.get('/v1/passangers', async(ctx) => {
    let page=ctx.request.query.page;
    let size=ctx.request.query.size;

    if(isNaN(page) || isNaN(size)){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body= {
            "msg":"invalid query"
        }
        return;
    }

    page= Number(page);
    size= Number(size);


    if(page<0|| page>17){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body= {
            "msg":"invalid page"
        }
        return;
    }

    if(size<=0|| size>500){
        ctx.response.status=404;
        ctx.response.type='application/json';
        ctx.body= {
            "msg":"invalid size"
        }
        return;
    }


    try{
        let response_body= await fetchdate(page,size);
        ctx.response.status=200;
        ctx.response.type= 'application/json';
        ctx.body= response_body;
    }
    
    catch(e){
        ctx.response.status=401;
        ctx.response.type='application/json';
        ctx.body={
            "msg": "something went wrong"
        }
    }

})


//if you need to parse a really large JSON file, one with millions of lines, reading the entire file into memory is no longer a great option.

// Because of this I needed a way to “Stream” the JSON and process as it went.  There is a nice module named ‘stream-json’ that does exactly what I wanted.

// With stream-json, we can use the NodeJS file stream to process our large data file in chucks. 

let fetchdate =  function(page,size){
    return new Promise((resolve,reject)=>{
        
        try{
            const StreamArray= require('stream-json/streamers/StreamArray');
            const jsonStream= fs.createReadStream('passangers.json').pipe(StreamArray.withParser());

            let response_body=[];

            //You'll get json objects here
            //Key is the array-index here
            jsonStream.on('data',({key,value})=>{
                if(key>=0 && key< page*500+size){
                    response_body.push(value);
                }
                if(key>=page*500+size){
                    return;
                }
            })

            jsonStream.on('end',()=>{
                resolve(response_body);
            }) 
        }

        catch(e){
            reject(e);
        }
        
    })
} 

app.use(router.routes());
app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})

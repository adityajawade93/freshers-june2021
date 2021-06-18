
let fs = require("fs")
const koa=require("koa")
const koarouter=require("@koa/router")
var parser=require("koa-bodyparser");
const Passanger = require("./Passenger.json")

let app =new koa()
let router=new koarouter()
app.use(parser())

router.get("/welcome",(ctx,nect)=>{

    ctx.body="welcome the passanger searching app";
    return ;
});

let validateRequest=function(page,size)
{

    // console.log(page*500+size,Passanger.length);

    if(page=== "undefined" || size==="undefined") return "not correct query";

    let totalPage=Math.floor(Passanger.length/500);
    
    if(totalPage<page) return "Page index is not correct";
    
    if(page*500+size>Passanger.length) return "not valid query params";
    
    return "valid query";
}

router.get('/',(ctx,next)=>
{

    var page = ctx.query.page;
    var size = ctx.query.size;

    //checking for integer page and size
    var reg = new RegExp('^[0-9]+$');
    if(!reg.test(page) || !reg.test(size))
    {
        ctx.body="please Enter Integer parameters";
        return;
    }

    page=Number(page);
    size=Number(size);
    
    var requestStatus=validateRequest(page,size);
    
    // console.log(requestStatus);
    
    if(validateRequest(page,size)==="valid query")
    {

        let startIndex=page*500;
        let dataTobeShown=[];
        for(let i=startIndex;i<startIndex+size;i++)
        {
            dataTobeShown.push(Passanger[i]);
        }
        ctx.body=dataTobeShown;
        return
    }
    else
    {
        ctx.body=requestStatus;
        return;
    }
   
});

app.use(router.routes())
app.use(async ctx=>
    {
        ctx.body="page not found try such as /page/size";
    });

app.listen(3001)


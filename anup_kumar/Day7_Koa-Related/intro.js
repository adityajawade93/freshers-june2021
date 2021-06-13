const koa=require("koa")
const koarouter=require("@koa/router")

let app =new koa()
let router=new koarouter()

router.get("/welcome",(ctx,nect)=>{

    ctx.body="welcome the kow router"
});

router.get("/todo/:id",(ctx,next)=>
{
    // ctx have access to both res and Request
    ctx.body=ctx.params.id+" is your id";
});
router.get("/todo/:id",(ctx,next)=>
{
    // ctx have access to both res and Request
    ctx.body=ctx.params.id+" is your id";
});
router.get("/todo/:id",(ctx,next)=>
{
    // ctx have access to both res and Request
    ctx.body=ctx.params.id+" is your id";
});

app.use(router.routes())
app.use(async ctx=>
    {
        ctx.body="page not found";
    });

app.listen(3001)
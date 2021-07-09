const koa = require('koa')
const koarouter = require('@koa/router')
const fs = require('fs')
const bodyparser = require('koa-bodyparser')

var app = new koa();
var router = new koarouter();

router.get('/v1/passengers', (ctx:any, next:any) => {
   let pagenumber: number = ctx.request.query.page
    let size: number = ctx.query.size
    console.log(typeof pagenumber)
    if(pagenumber>=18||typeof pagenumber !== 'string'||typeof size !== 'string'){
        ctx.body = "Page not found"
        return
    }

    let data: any = JSON.parse(fs.readFileSync("../passengerdata/passengers.json", "utf8"))
    ctx.body = JSON.stringify(data[pagenumber].data, null, 2)
})

app.use(bodyparser())
app.use(router.routes())
app.use(async (ctx :any ) => {
    ctx.body = "data not found"
})
app.listen(5500);
console.log("server started at 5500");
const koa = require('koa')
const koarouter = require('@koa/router')
const fs = require('fs')
const bodyparser = require('koa-bodyparser')

var app = new koa();
var router = new koarouter();

router.get('/v1/passengers', (ctx, next) => {
   let pageno = ctx.request.query.page
    let size = ctx.query.size
    console.log(typeof pageno)
    if(pageno>=18||typeof pageno !== 'string'||typeof size !== 'string'){
        ctx.body = "Page not found"
        return
    }

    let data = JSON.parse(fs.readFileSync("../passengerdata/passengers.json", "utf8"))
    ctx.body = JSON.stringify(data[pageno].data, null, 2)
})

app.use(bodyparser())
app.use(router.routes())
app.use(async (ctx) => {
    ctx.body = "data not found"
})
app.listen(5500);
console.log("server started at 5500");

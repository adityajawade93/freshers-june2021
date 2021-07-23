const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
import { router } from "../routes/routes"

export const app = new Koa()

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
app.use(async (ctx:any) => {
    ctx.response.status =404
    ctx.body = "error not found"
})

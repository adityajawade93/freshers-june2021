const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
import { router } from "../routes/routes"
import { setPath } from "../database/clientdb"


export const app = new Koa()

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
app.use(async (ctx: any) => {
    ctx.response.status = 404
    ctx.body = "error not found"
})

export const startServer = async () => {
    try {
        await setPath()
        await app.listen(3001)
        console.log('server start')
    
    } catch (e) {
        throw new Error(e)
    }

}
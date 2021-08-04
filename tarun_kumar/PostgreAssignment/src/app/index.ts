import Koa = require("koa");
import { config } from '../config/config';
import bodyParser = require("koa-bodyparser");
import { dbStart } from '../db/db'
import { Context } from 'vm';
import { router } from '../routes/routes'
const app = new Koa();
//const router = new koaRouter();
const port = config.port;

async function databaseStart(): Promise<void> {
    try {
        await dbStart();
        console.log('Database Connected');
    } catch (er) {
        console.log(er);
    }
}
async function serverStart(): Promise<void> {
    try {

        await app.listen(port, () => console.log("port on ", port));
    } catch (er) {
        console.log(er);
    }
}

databaseStart();
serverStart();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: Context) => {
    ctx.body = "Invalid URL, please provide correct url";
    ctx.status = 400;
});

export default app;

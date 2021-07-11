import Koa = require("koa");
import koaRouter = require("koa-router");
import bodyParser = require("koa-bodyparser");
import { dbStart } from '../db/db'
import { Context } from 'vm';
import { router } from '../routes/routes'
const app = new Koa();
//const router = new koaRouter();
const port = 3001;


async function start() {
    try {
        await dbStart();
        console.log('Database Connected');
        await app.listen(port, () => console.log("port on ", port));
    } catch (er) {
        console.log(er);
    }
};
start();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: Context) => {
    ctx.body = "Invalid URL, please provide correct url";
    ctx.status = 400;
});




//module.exports = server;

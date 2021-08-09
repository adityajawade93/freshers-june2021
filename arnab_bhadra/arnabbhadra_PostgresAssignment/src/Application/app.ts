
const koa = require('koa');
const bodyparser = require('koa-bodyparser');
import * as koaroute from '../Router/Router';

import * as message from "../Middleware/message"

const app :  any = new koa();

app.use(bodyparser());
app.use(koaroute.router.routes());
app.use(async (ctx: any) => {
    ctx.status = 404;
    ctx.body = message.pageNotFoundMessage;
});

export { app };
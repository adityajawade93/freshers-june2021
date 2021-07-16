import * as koa from 'koa';
import * as koaroute from '../Router/Router';
import * as bodyparser from 'koa-bodyparser';
import * as message from "../Middleware/message"

const app: koa<koa.DefaultState, koa.DefaultContext> = new koa();
app.use(bodyparser());
app.use(koaroute.router.routes());
app.use(async (ctx: koa.Context) => {
    ctx.status = 404;
    ctx.body = message.pageNotFoundMessage;
});

export { app };
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { Context } from "vm";

import { router } from "../routes/routes";

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: Context) => {
	ctx.response.status = 404;
	ctx.body = "Kindly Enter some valid URL";
});

export default app;

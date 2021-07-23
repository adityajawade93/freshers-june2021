import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { Context } from "vm";
import { dbPort, dbHost } from "../config/config";
import { router } from "../routes/routes";

const port = dbPort;
const host = dbHost;

export const startApp = function() {
	const app = new Koa();

	app.use(bodyParser());
	app.use(router.routes());
	app.use(router.allowedMethods());
	app.use(async (ctx: Context) => {
		ctx.response.status = 404;
		ctx.body = "Kindly Enter some valid URL";
	});

	app.listen(port, host);
	console.log(`Server listening on http://${host}:${port}`);
};

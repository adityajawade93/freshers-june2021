import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { dbStart } from '../db/db';
import { Context } from 'vm';
import { router } from '../routes/routes';
const app = new Koa();
const port = 3001;

async function start() {
	try {
		await dbStart();
		console.log('Database Connected.');
		await app.listen(port, () => console.log('Server started at Port:', port));
	} catch (err) {
		console.log(err);
	}
}
start();
app.use(bodyParser());
app.use(router.routes());
app.use(async (ctx: Context) => {
	ctx.body = 'Invalid URL, please provide correct url.';
	ctx.status = 400;
});

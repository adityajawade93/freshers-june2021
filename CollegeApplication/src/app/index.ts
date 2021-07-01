import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Context } from "vm";

import router from '../routes/index';
import {
  start as dbStart,
} from '../database/index';

const app = new Koa();

const port: number = 3000;

app
  .use(bodyParser())
  .use(router.allowedMethods())
  .use(router.routes());

app.use(async (ctx: Context) => {
  ctx.status = 404;
  ctx.body = 'Page not found';
});

export const start = async function () {
  try {
    await dbStart();
    console.log('DB Connected');
    await app.listen(port);
    console.log(`Listening to port ${port}`);
  } catch (e) {
    console.log(e);
  }
}

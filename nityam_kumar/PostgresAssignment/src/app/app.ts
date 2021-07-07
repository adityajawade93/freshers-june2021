import Koa from "koa";

import bodyParser from "koa-bodyparser";

import { Context } from "vm";

import json from "koa-json";

const app = new Koa();

import router from "../routes/index";

app.use(bodyParser()).use(json()).use(router());

app.use(async (ctx: Context) => {
  ctx.status = 404;
  ctx.body = "Page not found";
});

export default app;

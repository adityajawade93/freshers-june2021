import Koa from "koa";

import bodyParser from "koa-bodyparser";

import { Context } from "vm";

import json from "koa-json";

const app = new Koa();

import router from "../routes/index";

import AppError from "../utils/appError";

import { globalErrHandler } from "../controller/errorHandler";

app.use(globalErrHandler).use(bodyParser()).use(json()).use(router());

app.use(async (ctx: Context, next) => {
  throw new AppError("Page NOT found", 404);
});

app.on("error", (err, ctx: Context) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
  console.log(err);
});

export default app;

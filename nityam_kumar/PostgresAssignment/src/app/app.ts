/* eslint-disable import/first */
import dotenv from "dotenv";

import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

import Koa from "koa";

import bodyParser from "koa-bodyparser";

import json from "koa-json";

import router from "../routes/index";

import AppError from "../utils/appError";

import { globalErrHandler } from "../utils/errorHandler";

const app = new Koa();

app.use(globalErrHandler).use(bodyParser()).use(json()).use(router());

app.use(async () => {
  throw new AppError("Page NOT found", 404);
});

export default app;

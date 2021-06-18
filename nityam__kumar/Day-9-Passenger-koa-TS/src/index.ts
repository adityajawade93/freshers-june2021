import Koa from "koa";

import bodyParser from "koa-bodyparser";

import KoaRouter from "koa-router";

import json from "koa-json";

import { getPassengers } from "./routes_and_controller";

const app = new Koa();
const router = new KoaRouter();
const port: number = 5002;

app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

router.get("/v1/passengers", getPassengers);

app.listen(port, () => {
  console.log("server is active on port", port);
});

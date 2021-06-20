import Koa from "koa";

import bodyParser from "koa-bodyparser";

import KoaRouter from "koa-router";

import json from "koa-json";

import {
  createPassenger,
  updatePassenger,
  getPassengers
} from "./routes_and_controller";

const app = new Koa();

const router = new KoaRouter();

app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());
router.get("/v1/passengers", getPassengers);
router.post("/v1/passenger", createPassenger);
router.put("/v1/passenger/:passengerId", updatePassenger);

export default app;

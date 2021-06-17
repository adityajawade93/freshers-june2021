import Koa from "koa";

import bodyParser from "koa-bodyparser";

import KoaRouter from "koa-router";

import json from "koa-json";

import { DefaultState, Context } from 'koa';

// const router = new KoaRouter<DefaultState, Context>();


const port: number = 5001;

import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "./routes_and_controller";

const app = new Koa();

const router = new KoaRouter();

app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

router.get("/todo", getTask);

router.get("/todo/:id", getTaskById);

router.post("/todo", createTask);

router.put("/todo/:id", updateTask);

router.delete("/todo/:id", deleteTask);

app.listen(port, () => {
  console.log("server is active on port", port);
});

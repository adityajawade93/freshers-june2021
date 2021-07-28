import { router } from "../router/router";
import { config } from "../config/config";

import { Context } from "vm";
const bodyParser = require("koa-bodyparser");
const Koa = require("koa");
const json = require("koa-json");
const port = config.port;
const app = new Koa();

app.use(bodyParser());
app.use(json());

app.use(router.routes());
app.use(async (ctx: Context) => {
  ctx.response.status = 404;
  ctx.body = "Not Found";
});


app.listen(port, () => {
  console.log(`server is started at port ${port}`);
});

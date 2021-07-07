import { Context } from "vm";

const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const router = require('./router/router');

const app = new koa();

const port = 4000;

app.use(json());
app.use(bodyParser());
app.use(router.routes());
app.use(async (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.body = "Not Found";
});

app.listen(port, () => {
  console.log("server is running at port " + port);
});

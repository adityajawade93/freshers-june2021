const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
import router from "../routes/routes";
const bodyParser = require("koa-bodyparser");
const Koa = require("koa");
const json = require("koa-json");
//const port: number = 5001;
var app = new Koa();

app.use(bodyParser());
app.use(json());

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.body = "Not Found";
});

const {port} = process.env;
const{host}= process.env;

app.listen(port, () => {
  console.log(`server is running at ${host} and at ${port}`);
});

module.exports = app;

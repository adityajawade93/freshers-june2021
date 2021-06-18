const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

const KoaRouter = require("@koa/router");

const json = require("koa-json");

const { getPassengers } = require("./routes_and_controller");

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

router.get("/v1/passengers", getPassengers);

module.exports = app;

"use strict";
const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const port = 3000;
const router = new koaroute();
app.use(json());
app.use(bodyparser());
router.get('/', (ctx) => {
    ctx.body = "hello";
});
app.use(router.routes());
app.listen(port, () => {
    console.log("server started successfully");
});

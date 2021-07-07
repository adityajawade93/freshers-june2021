const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const schoolRoutes = require('./routes/school.routes');

const app1 = new koa();

app1.use(bodyParser());

app1.use(schoolRoutes.routes());

app1.use(async (ctx: any) => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
});

module.exports = app1;
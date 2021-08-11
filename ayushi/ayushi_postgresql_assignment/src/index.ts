const Koa = require('koa');
const Router = require('./routes/main.ts');
const koaJson = require('koa-json');
const koaBodyparser = require('koa-bodyparser');

const port = process.env.PORT || 3000;

const app = new Koa();

app.use(koaJson());
app.use(koaBodyparser());
//app.use(Router.routes()).use(Router.allowedMethods());
app.use(Router());

app.listen(port,()=>{
  console.log(`The server is running at port number ${port}`);
});

module.exports = app;

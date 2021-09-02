const Koa = require('koa');
// const Router = require('./routes/main.ts');
const koaJson = require('koa-json');
const koaBodyparser = require('koa-bodyparser');

function func (Router: () => any) {
  const app = new Koa();

  app.use(koaJson());
  app.use(koaBodyparser());
  //app.use(Router.routes()).use(Router.allowedMethods());
  app.use(Router());
  return app;
}
module.exports = func;
//module.exports = app;

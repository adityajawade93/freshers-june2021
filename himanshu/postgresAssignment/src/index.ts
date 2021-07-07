const Koa = require('koa');

const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

const port = 3000;
const combineRouters = require('koa-combine-routers');

app.use(json());
app.use(bodyparser());

const router = combineRouters(require('./routes/studentRoutes.ts'), require('./routes/resultRoutes.ts'));

app.use(router());

const server = app.listen(port, () => {
  console.log('server started successfully');
});

module.exports = server;

const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const passengers = require('./passengers.json');

const port = 8000;

const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(bodyParser());

router.get('/v1/passengers', async(ctx) => {
    const page = parseInt(ctx.request.query.page);
    const limit = parseInt(ctx.request.query.size);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    try {
      results = await passengers.slice(startIndex, endIndex);
      ctx.response.type = 'application/json';
      ctx.response.status = 200;
      ctx.response.body = JSON.stringify(results);
    } catch (e) {
      ctx.response.type = 'text/html';
      ctx.response.status = 500;
      ctx.response.body = 'data not fetched';
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The server is running at port ${port}`);
});

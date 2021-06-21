const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
const router = new koarouter();

const passengers: Array<JSON> = require("./passengers.json");


router.get('/v1/passengers', (ctx) => {
    let page: number = ctx.query.page;
    let size: number = ctx.query.size;

    let n: number = passengers.length;

    if (page * size >= n) {
        ctx.status = 406;
        ctx.body = 'Given page no and size is not possible';
    }
    else {
        let start: number = size * page;
        let end: number = size*(page+1);
        ctx.status = 200;
        ctx.body = passengers.slice(start, end);

    }


});

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.use(async ctx => {
    ctx.status = 404;
    ctx.body = 'Page not found';

});

console.log('started');
app.listen(3000);
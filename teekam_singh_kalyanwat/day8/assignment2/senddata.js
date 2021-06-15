const fs = require('fs');
const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
const router = new koarouter();

const user = require("./passangers.json");


router.get('/v1/passengers', (ctx) => {
    let page = ctx.query.page;
    let size = ctx.query.size;

    let start = 500 * page;
    let end;
    if (size < 0) {
        ctx.body = 'invalid size';
    }
    else {
        if (size > 500) {
            end = start + 499;
        }
        else {
            end = start + ((size - 1) % 500);
        }

        ctx.body = user.slice(start, end + 1);
    }


});

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.use(async ctx => {
    ctx.body = 'Page not found';

});

console.log('started');
app.listen(3000);
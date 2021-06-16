const koa = require('koa');
const koarouter = require("@koa/router");
const bodyParser = require('koa-bodyparser');

const listPassengers = require('./passengers.json')

let app = new koa();
let router = new koarouter();
const port = 4001;

router.get('/v1/passengers', (ctx) => {
    let page = ctx.query.page;
    let size = ctx.query.size;
    let totalPages = Math.round(listPassengers.length / size) + 1;
    if (typeof page === "number" && typeof size === "number" && page >= 0) {
        const first = page * size;
        const last = Math.min((page + 1) * size, listPassengers.length);
        const req_data = listPassengers.slice(first, last);


        const data = {
            totalPassengers: listPassengers.length,
            totalPages: totalPages,
            data: req_data,
        };
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.body = data;

    }
    else {
        ctx.response.status = 404;
        ctx.response.type = 'text/html';
        ctx.body = "fetching is not possible";
    }
})

app.use(bodyParser());
app.use(router.routes());
app.use(async ctx => {
    ctx.body = 'Not Found'
})

app.listen(port, () => {
    console.log("server is running on port " + port);
});
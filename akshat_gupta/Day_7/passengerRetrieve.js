const Koa = require('koa');
const Router = require('koa-router');
const passengers = require('./passengers.json');

const totalpassengers = passengers.length;

const app = new Koa();
const router = new Router({
    prefix: '/v1/passengers'
});

const response = (ctx, status, type, body) => {
	ctx.status = status;
	ctx.type = type;
	ctx.body = body;
};

router.get('/', (ctx) => {
    const page = ctx.request.query.page;
    const size = ctx.request.query.size;
    if(page === undefined || size === undefined) {
        response(ctx, 406, 'application/json', {message: 'Not enough details provided.'});
        return;
    }
    const pages = Math.round(totalpassengers/size) + 1;
    if(page > pages) {
        response(ctx, 406, 'application/json', {message: 'Query parameters out of range.'});
        return;
    }
    const dataArray = passengers.slice(page*size, Math.min((page+1)*size, passengers.length));
    const body = {
        totalPassengers: totalpassengers,
        totalPages: pages,
        data: dataArray
    }
    response(ctx, 200, 'application/json', body);
});

app.use(router.routes());
app.use(async (ctx) => {
	response(ctx, 400, 'application/json', {message:'Page not found!'});
});

module.exports = app;
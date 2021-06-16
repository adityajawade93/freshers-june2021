const koa = require('koa');
const koarouter = require('@koa/router');

const passengers = require('../fake_api_call/passengers.json');
var totalPassengers = passengers.length;

app = new koa();
router = new koarouter();

function validation(page, size){
    if (typeof page !== "number" || typeof size !== "number") {
        return "Invalid parameters";
    }
    if(page < 0 || size < 0){
        return "Invalid parameters";
    }
    total_page = Math.ceil(passengers.length / size);
    if(size > passengers.length){
        return "Invalid size";
    }
    if(page >= total_page){
        return "Invalid page number";
    }
    return "true";
}

router.get('/v1/passenger', (ctx,next) => {
    page = parseInt(ctx.request.query.page);
    size = parseInt(ctx.request.query.size);
    valid = validation(page,size);
    if(valid === "true"){
        total_page = Math.ceil(passengers.length / size);
        data = passengers.slice(page * size, Math.min( (page + 1) * size, passengers.length) );
        ctx.body = {
            totalPassengers : totalPassengers,
            totalPages : total_page,
            data : data,
        };
        return;
    }
    else{
        ctx.body = valid;
        return;
    }
});

app.use(router.routes());

app.use(async ctx => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
});

const server = app.listen(3001, console.log("port on ", 3001));

module.exports = server;
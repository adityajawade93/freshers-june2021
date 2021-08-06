const koa = require('koa');
const koarouter = require('@koa/router');

const passengers = require('./passengers.json');
var totalPassengers = passengers.length;

const app = new koa();
const router = new koarouter();

function validation(page: number, size: number){
    if (typeof page !== "number" || typeof size !== "number") {
        return "Invalid parameters";
    }
    if(page < 0 || size < 0){
        return "Invalid parameters";
    }
    var total_page = Math.ceil(passengers.length / size);
    if(size > passengers.length){
        return "Invalid size";
    }
    if(page >= total_page){
        return "Invalid page number";
    }
    return "true";
}

router.get('/v1/passenger', (ctx: any,next: any) => {
    var page = parseInt(ctx.request.query.page);
    var size = parseInt(ctx.request.query.size);
    var valid = validation(page,size);
    if(valid === "true"){
        var total_page = Math.ceil(passengers.length / size);
        var data = passengers.slice(page * size, Math.min( (page + 1) * size, passengers.length) );
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

app.use(async (ctx: any) => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
});

const server = app.listen(3001, () => console.log("port on ", 3001));

module.exports = server;
const fs = require('fs');
const koa = require('koa');
const koarouter = require('@koa/router');
const uuid = require('uniqid');

const app = new koa();
const router = new koarouter();



router.get('/v1/passengers', (ctx) => {
    let page = ctx.query.page;
    let size = ctx.query.size;

    let passengers = require("./pass.json");
    let n = passengers.length;

    if (page * size >= n) {
        ctx.status = 406;
        ctx.body = 'Given page no and size is not possible';
    }
    else {
        let start = size * page;
        let end = size*(page+1);
        ctx.status = 200;
        ctx.body = passengers.slice(start, end);

    }

});

router.post('/v1/passengers', (ctx) => {
    let passengers = require("./pass.json");
    let file = ctx.request.body;
    let id = uuid();

    file["_id"] = id;
    passengers.push(file);

    fs.writeFile("pass.json", JSON.stringify(passengers), err => {
        if (err) throw err;
    });

    ctx.status = 200;
    ctx.body = 'passenger with id ' + id + ' created successfully';
});

router.put('/v1/passengers/:id', (ctx) => {
    let id = ctx.params.id;
    let passengers = require("./pass.json");

    let len = passengers.length;
    let i;
    for (i = 0; i < len; i++) {
        if (passengers[i]["_id"] == id) break;
    }

    if (i === len) {
        ctx.status = 406;
        ctx.body = 'passenger not found with this id';
    }
    else {
        passengers.splice(i, 1);
        let file = ctx.request.body;
        file["_id"] = id;
        passengers.push(file);
        fs.writeFile("pass.json", JSON.stringify(passengers), err => {
            if (err) throw err;
        });

        ctx.status = 200;
        ctx.body = 'passenger with id ' + id + ' updated successfully';
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

module.exports = app ;
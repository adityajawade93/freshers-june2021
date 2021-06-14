const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
const router = new koarouter();

var task_list = []
let first_task = {
    "id": 26,
    "title": "get haircut",
    "status": false
}
task_list.push(first_task);

function getindex(idd) {
    let len = task_list.length;
    let i = 0;
    for (i = 0; i < len; i++) {
        if (task_list[i]['id'] == idd) break;
    }
    return i;
}

router.get('/todo', (ctx) => {
    ctx.body = task_list;
});

router.get('/todo/:id', (ctx) => {
    let id = ctx.params.id;
    if (id.length == 0 || id.length > 5) {
        ctx.body = 'Please check your id';
        return;
    }

    let ind = getindex(id);
    ctx.body = task_list[ind];

});

router.post('/todo/', (ctx) => {
    let file = ctx.request.body;

    if (file['title'].length===0 || file['status'] === null || file['id'] === null) {
        ctx.body = 'please give all required values';
        return;
    }

    if (typeof (file['id']) != 'number' || typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.body = 'Please enter values in correct format';
        return;
    }

    task_list.push(file);
    ctx.body = 'task added';
});

router.put('/todo/:id', (ctx) => {
    let id = ctx.params.id.trim();
    let ind = getindex(id);
    if (ind === task_list.length) {
        ctx.body = 'No task is present with given id';
        return;
    }
    let file = ctx.request.body;
    if (file['title'].length === 0 || file['status'] === null) {
        ctx.body = 'please give all required values';
        return;
    }
    if (typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.body = 'Please enter values in correct format';
        return;
    }
    Object.assign(task_list[ind], ctx.request.body);
    ctx.body = 'task updated';
});

router.delete('/todo/:id', (ctx) => {
    let id = ctx.params.id.trim();
    if (id.length == 0 || id.length > 5 ) {
        ctx.body = 'Please check your id';
        return;
    }
    let ind = getindex(id);
    if (ind === task_list.length) {
        ctx.body = 'No task is present with given id';
        return;
    }

    task_list.splice(ind, 1);
    ctx.body = 'task deleted';
});

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.use(async ctx => {
    ctx.body = 'Page not found';

});


app.listen(3000);

module.exports = app;
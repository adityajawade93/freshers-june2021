const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
const router = new koarouter();

var task_list = []
let map = new Map();
let first_task = {
    "id": 26,
    "title": "get haircut",
    "status": false
}
task_list.push(first_task);
map.set(26,true);

function getindex(idd) {
    let len = task_list.length;
    let i = 0;
    for (i = 0; i < len; i++) {
        if (task_list[i]['id'] == idd) break;
    }
    return i;
}

router.get('/todo', (ctx) => {
    ctx.status = 200;
    ctx.body = task_list;
});

router.get('/todo/:id', (ctx) => {
    let id = Number(ctx.params.id);
    if (isNaN(id) || id<1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }

    if(!map.has(id)){
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }

    let ind = getindex(id);
    ctx.status = 200;
    ctx.body = task_list[ind];

});

router.post('/todo/', (ctx) => {
    let file = ctx.request.body;

    if (file['title'].length===0 || file['status'] === null || file['id'] === null) {
        ctx.status = 415;
        ctx.body = 'please give all required values';
        return;
    }

    if (typeof (file['id']) != 'number' || typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.status = 415;
        ctx.body = 'Please enter values in correct format';
        return;
    }
    
    let id = file['id'];
    if(map.has(id)){
        ctx.status = 415;
        ctx.body = 'This id already exists, Please enter another';
        return;
    }
    if(id<1 || id > 10000){
        ctx.status = 415;
        ctx.body = 'id should be between 1 and 99999';
        return;
    }

    task_list.push(file);
    map.set(id,true);
    ctx.status = 200;
    ctx.body = 'task added';
});

router.put('/todo/:id', (ctx) => {
    let id = Number(ctx.params.id);
    if (isNaN(id) || id<1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }
    let ind = getindex(id);
    if (!map.has(id)) {
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }
    let file = ctx.request.body;
    if (file['title'].length === 0 || file['status'] === null) {
        ctx.status = 415;
        ctx.body = 'please give all required values';
        return;
    }
    if (typeof (file['title']) != 'string' || typeof (file['status']) != 'boolean') {
        ctx.status = 415;
        ctx.body = 'Please enter values in correct format';
        return;
    }
    Object.assign(task_list[ind], ctx.request.body);
    ctx.status = 200;
    ctx.body = 'task updated';
});

router.delete('/todo/:id', (ctx) => {
    let id = Number(ctx.params.id);
    if (isNaN(id) || id<1 || id > 100000) {
        ctx.status = 415;
        ctx.body = 'Please check your id';
        return;
    }
    let ind = getindex(id);
    if (!map.has(id)) {
        ctx.status = 415;
        ctx.body = 'No task is present with given id';
        return;
    }

    task_list.splice(ind, 1);
    map.delete(id);
    ctx.status = 200;
    ctx.body = 'task deleted';
});

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.use(async ctx => {
    ctx.status = 404;
    ctx.body = 'Page not found';

});


app.listen(3000);

module.exports = app;
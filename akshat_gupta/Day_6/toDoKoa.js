const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const uuid = require('uuid');
const port = 3000;
const toDoList = {};
let len = 0;

const toDoApp = new Koa();
const myRouter = new Router({
    prefix: '/todo',
});

const response = (ctx, flag, body) => {
    if (flag) {
        ctx.status = 200;
        ctx.type = 'application/json';
    } else {
        ctx.status = 404;
        ctx.type = 'text/plain';
    }
    ctx.body = body;
};

myRouter.get('/', (ctx) => {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    if (len === 0) {
        response(ctx, true, 'No entries to display.');
    } else {
        response(ctx, true, JSON.stringify(toDoList));
    }
});

myRouter.get('/:id', (ctx) => {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const id = ctx.params.id;
    // if(id.length > 8) {
    //     ctx.status = 404;
    //     ctx.body = "Id must be less than 8 chracters."
    // }
    if (toDoList.hasOwnProperty(id)) {
        response(ctx, true, JSON.stringify(toDoList[id]));
    } else {
        response(ctx, false,
                'Entry with Id : ' + id + ' does not exist in database.');
    }
});

myRouter.post('/', (ctx) => {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const title = ctx.request.body.title;
    const completed = ctx.request.body.completed;
    if (title === undefined || completed === undefined) {
        response(ctx, false, 'Not enough details provided.');
        return;
    } else if (typeof title !== 'string' || typeof completed !== 'boolean') {
        response(ctx, false,
                'Only Strings(title) and Boolean(completed) allowed.');
        return;
    }
    const id = uuid.v4();
    const date = new Date().toJSON().slice(0, 10);
    const newItem = {
        'id': id,
        'createdDate': date,
        'title': title,
        'completed': completed,
    };
    toDoList[id.toString()] = newItem;
    len++;
    response(ctx, false, 'Entry added Successfully.');
});

myRouter.put('/:id', (ctx) => {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const id = ctx.params.id;
    if (toDoList.hasOwnProperty(id) === false) {
        response(ctx, true,
                'Entry with Id : ' + id + ' does not exist in database.');
        return;
    }
    const title = ctx.request.body.title;
    const completed = ctx.request.body.completed;
    if (title === undefined || completed === undefined) {
        response(ctx, false, 'Not enough details provided.');
        return;
    } else if (typeof title !== 'string' || typeof completed !== 'boolean') {
        response(ctx, false,
                'Only Strings(title) and Boolean(completed) allowed.');
        return;
    }
    if (title !== undefined) {
        toDoList[id.toString()].title = title;
    }
    if (completed !== undefined) {
        toDoList[id.toString()].completed = completed;
    }
    response(ctx, true, 'Entry updated Successfully.');
});

myRouter.delete('/:id', (ctx) => {
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const id = ctx.params.id;
    if (toDoList.hasOwnProperty(id) === false) {
        response(ctx, true,
                'Entry with Id : ' + id + ' does not exist in database.');
        return;
    }
    delete toDoList[id.toString()];
    len--;
    response(ctx, true, 'Entry deleted Successfully.');
});

toDoApp.use(bodyParser());
toDoApp.use(myRouter.routes());
toDoApp.use(async (ctx) => {
    response(ctx, false, 'Page not found!');
});

toDoApp.listen(port, () => {
    console.log('Server started at', port);
});

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const uuid = require('uuid');
const toDoList = {};
let len = 0;

const toDoApp = new Koa();
const myRouter = new Router({
	prefix: '/todo',
});

const response = (ctx, status, type, body) => {
	ctx.status = status;
	ctx.type = type;
	ctx.body = body;
};

myRouter.get('/', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	if (Object.keys(toDoList).length === 0) {
		response(ctx, 200, 'text/plain', 'No entries to display.');
	} else {
		response(ctx, 200, 'application/json', JSON.stringify(toDoList));
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
	if (Object.prototype.hasOwnProperty.call(toDoList, id)) {
		response(ctx, 200, 'application/json', JSON.stringify(toDoList[id]));
	} else {
		response(ctx, 404, 'text/plain',
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
		response(ctx, 406, 'text/plain', 'Not enough details provided.');
		return;
	} else if (typeof title !== 'string' || typeof completed !== 'boolean') {
		response(ctx, 415, 'text/plain',
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
	response(ctx, 201, 'text/plain', 'Entry added Successfully.');
});

myRouter.put('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id = ctx.params.id;
	if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
		response(ctx, 404, 'text/plain',
			'Entry with Id : ' + id + ' does not exist in database.');
		return;
	}
	const title = ctx.request.body.title;
	const completed = ctx.request.body.completed;
	if (title === undefined || completed === undefined) {
		response(ctx, 406, 'text/plain', 'Not enough details provided.');
		return;
	} else if (typeof title !== 'string' || typeof completed !== 'boolean') {
		response(ctx, 415, 'text/plain',
			'Only Strings(title) and Boolean(completed) allowed.');
		return;
	}
	if (title !== undefined) {
		toDoList[id.toString()].title = title;
	}
	if (completed !== undefined) {
		toDoList[id.toString()].completed = completed;
	}
	response(ctx, 202, 'text/plain', 'Entry updated Successfully.');
});

myRouter.delete('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id = ctx.params.id;
	if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
		response(ctx, 404, 'text/plain',
			'Entry with Id : ' + id + ' does not exist in database.');
		return;
	}
	delete toDoList[id.toString()];
	len--;
	response(ctx, 202, 'text/plain', 'Entry deleted Successfully.');
});

toDoApp.use(bodyParser());
toDoApp.use(myRouter.routes());
toDoApp.use(async (ctx) => {
	response(ctx, 400, 'text/plain', 'Page not found!');
});

module.exports = toDoApp;

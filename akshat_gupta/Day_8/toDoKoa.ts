import Koa = require('koa');
import Router = require('koa-router');
import bodyParser = require('koa-bodyparser');
import uuid = require('uuid');
class entry {
    public id: string;
    public createdDate: string;
    public title: string;
    public completed: boolean;
    constructor() {this.id = '0'; this.createdDate = new Date().toJSON().slice(0, 10); this.title = '0000';	this.completed = true;
    }
}
let toDoList: Record<string, entry>;
const toDoApp = new Koa();
const myRouter = new Router({
	prefix: '/todo',
});

interface newReq {
	title: string,
	completed: boolean
}

const response = (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, status: number, type: string, body: Record<string, any>) => {
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
		response(ctx, 200, 'application/json', {message: 'No entries to display.'});
	} else {
		response(ctx, 200, 'application/json', {message: 'Request fulfiled.', content: toDoList});
	}
});

myRouter.get('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id: string = ctx.params.id;
	// if(id.length > 8) {
	//     ctx.status = 404;
	//     ctx.body = "Id must be less than 8 chracters."
	// }
	if (Object.prototype.hasOwnProperty.call(toDoList, id)) {
		response(ctx, 200, 'application/json', {message: 'Requested entry found.', content: toDoList[id]});
	} else {
		response(ctx, 404, 'application/json', {message: 'Entry with Id : ' + id + ' does not exist in database.'});
	}
});

myRouter.post('/', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const Data = <unknown>ctx.request.body;
	const data = <newReq>Data;
	const title: string = data.title;
	const completed: boolean = data.completed;
	if (title === undefined || completed === undefined) {
		response(ctx, 406, 'application/json', {message: 'Not enough details provided.'});
		return;
	} else if (typeof title !== 'string' || typeof completed !== 'boolean') {
		response(ctx, 415, 'application/json', {message: 'Only Strings(title) and Boolean(completed) allowed.'});
		return;
	}
	const Id = uuid.v4();
	const date = new Date().toJSON().slice(0, 10);
	const newItem: entry = {
		id: Id,
		createdDate: date,
		title: title,
		completed: completed,
	};
	toDoList[Id] = newItem;
	response(ctx, 201, 'application/json', {message: 'Entry added Successfully.', content: newItem});
});

myRouter.put('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id: string = ctx.params.id;
	if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
		response(ctx, 404, 'application/json',
			{message: 'Entry with Id : ' + id + ' does not exist in database.'});
		return;
	}
	const Data = <unknown>ctx.request.body;
	const data = <newReq>Data;
	const title: string = data.title;
	const completed: boolean = data.completed;
	if (title === undefined && completed === undefined) {
		response(ctx, 406, 'application/json', {message: 'Not enough details provided.'});
		return;
	} else if (typeof title !== 'string' || typeof completed !== 'boolean') {
		response(ctx, 415, 'application/json',
			{'message':'Only Strings(title) and Boolean(completed) allowed.'});
		return;
	}
	if (title !== undefined) {
		toDoList[id].title = title;
	}
	if (completed !== undefined) {
		toDoList[id].completed = completed;
	}
	response(ctx, 202, 'application/json', {message:'Entry updated Successfully.', content: toDoList[id]});
});

myRouter.delete('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id: string = ctx.params.id;
	if (Object.prototype.hasOwnProperty.call(toDoList, id) === false) {
		response(ctx, 404, 'application/json',
			{message: 'Entry with Id : ' + id + ' does not exist in database.'});
		return;
	}
	delete toDoList[id.toString()];
	response(ctx, 202, 'application/json', {message: 'Entry deleted Successfully.'});
});

toDoApp.use(bodyParser());
toDoApp.use(myRouter.routes());
toDoApp.use(async (ctx) => {
	ctx.status = 400;
	ctx.type = 'application/json';
	ctx.body = {message:'Page not found!'};
});

const port = 3000;
toDoApp.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);
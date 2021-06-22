import Koa = require('koa');
import Router = require('koa-router');
import bodyparser = require('koa-bodyparser');
import fs = require('fs');
import uuid = require('uuid');
import pass from './passengers.json';
const passengers: Record<string, any> = pass;

export interface entry {
	_id: string;
	name: string;
	trips: number;
	airline: Array<aline> | aline;
	__v: number;
}

export interface aline {
	id: number,
	name: string,
	country: string,
	logo: string,
	slogan: string,
	head_quaters: string,
	website: string,
	established: string
}

const app = new Koa();
const router = new Router({
	prefix: '/v1/passengers'
});

const response = (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, Record<string, unknown>>, any>, status: number, type: string, body: Record<string, any>) => {
	ctx.status = status;
	ctx.type = type;
	ctx.body = body;
};

router.get('/', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	if(ctx.request.query.page === undefined || ctx.request.query.size === undefined) {
		response(ctx, 406, 'application/json', {message: 'Not enough details provided.'});
		return;
	}
	const arr = Object.values(passengers);
	const page = Number(ctx.request.query.page);
	const size = Number(ctx.request.query.size);
	const totalpassengers = arr.length;
	const pages = Math.floor(totalpassengers/size) + 1;
	if(page + 1 > pages) {
		response(ctx, 416, 'application/json', {message: 'Query parameters out of range.'});
		return;
	}
	const dataArray = arr.slice(page*size, Math.min((page+1)*size, totalpassengers));
	const body = {
		totalPassengers: totalpassengers,
		totalPages: pages,
		data: dataArray
	};
	response(ctx, 200, 'application/json', { message: 'Request fulfiled.', content: body });
});

const check2 = (a: aline) => {
	if(a.id === undefined || a.name === undefined || a.country === undefined || a.logo === undefined
	|| a.slogan === undefined || a.head_quaters === undefined || a.website === undefined 
	|| a.established === undefined)
		return false;
	if(typeof a.id !== 'number' || typeof a.name !== 'string' || typeof a.country !== 'string' 
	|| typeof a.logo !== 'string' || typeof a.slogan !== 'string' || typeof a.head_quaters !== 'string' 
	|| typeof a.website !== 'string' || typeof a.established !== 'string')
		return false;
	return true;
};

const check = (arr: Array<aline> | aline) => {
	if(!Array.isArray(arr)) {
		return check2(arr);
	}
	const len = arr.length;
	for(let i=0;i<len;i++) {
		if(!check2(arr[i]))
			return false;
	}
	return true;
};

const validate = (body: Record<string, any>) => {
	if(body.name === undefined || body.trips === undefined || body.airline === undefined || body.__v === undefined) 
		return false;
	if(typeof body.name !== 'string' || typeof body.trips !== 'number' || typeof body.__v !== 'number' 
	|| !check(body.airline)) 
		return false;
	return true;
};

router.post('/', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const body: any = ctx.request.body;
	if(!validate(body)) {
		response(ctx, 406, 'application/json', {message: 'Not enough details provided./Wrong format data!'});
		return;
	}
	body._id = uuid.v4();
	const newEntry: entry = body;
	passengers[newEntry._id] = newEntry;
	const json = JSON.stringify(passengers);
	fs.writeFile('passengers.json', json, 'utf8', (err) => {
		if (err) {
			throw err;
		}
	});
	response(ctx, 201, 'application/json', {message: 'Entry added Successfully.', content: newEntry});
});

router.put('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id = ctx.params.id;
	if(!Object.prototype.hasOwnProperty.call(passengers, id)) {
		response(ctx, 400, 'application/json', {message: 'Entry with Id : :id does not exist in database.'});
		return;
	}
	const body: any = ctx.request.body;
	if(!validate(body)) {
		response(ctx, 406, 'application/json', {message: 'Not enough details provided./Wrong format data!'});
		return;
	}
	const newEntry1: Record<string, any> = {_id: id};
	const newEntry: entry = Object.assign(newEntry1, body); 
	passengers[id] = newEntry;
	const json = JSON.stringify(passengers);
	fs.writeFile('passengers.json', json, 'utf8', (err) => {
		if (err) {
			throw err;
		}
	});
	response(ctx, 202, 'application/json', {message:'Entry updated Successfully.', content: newEntry});
});

app.use(bodyparser());
app.use(router.routes());
app.use(async (ctx) => {
	ctx.status = 400;
	ctx.type = 'application/json';
	ctx.body = {message:'Page not found!'};
});

const port = 3000;
export const server = app.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);
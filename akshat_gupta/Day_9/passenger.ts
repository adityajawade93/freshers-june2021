import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import * as fs from 'fs';
import * as uuid from 'uuid';
import pass from './passengers.json';
import Ajv from 'ajv';

const ajv = new Ajv();
const passengers: Record<string, any> = pass;

interface entry {
	_id: string;
	name: string;
	trips: number;
	airline: Array<aline> | aline;
	__v: number;
}

interface aline {
	id: number;
	name: string;
	country?: string;
	logo?: string;
	slogan?: string;
	head_quaters?: string;
	website?: string;
	established?: string;
}

const schema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		trips: { type: 'number' },
		airline: { type: ['array', 'object'] },
		__v: { type: 'number' }
	},
	required: ['name', 'trips', 'airline', '__v'],
	additionalProperties: false,
};

const isValid = ajv.compile(schema);

const schema2 = {
	properties: {
		id: { type: 'number' },
		name: { type: 'string' },
		country: { type: 'string' },
		logo: { type: 'string' },
		slogan: { type: 'string' },
		head_quaters: { type: 'string' },
		website: { type: 'string' },
		established: { type: 'string' },
	},
	required: ['id', 'name'],
	additionalProperties: false,
};

const isValid2 = ajv.compile(schema2);

const schema3 = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		trips: { type: 'number' },
		airline: { type: ['array', 'object'] },
		__v: { type: 'number' }
	},
	required: [],
	additionalProperties: false,
};

const isValid3 = ajv.compile(schema3);

const schema4 = {
	properties: {
		id: { type: 'number' },
		name: { type: 'string' },
		country: { type: 'string' },
		logo: { type: 'string' },
		slogan: { type: 'string' },
		head_quaters: { type: 'string' },
		website: { type: 'string' },
		established: { type: 'string' },
	},
	required: [],
	additionalProperties: false,
};

const isValid4 = ajv.compile(schema4);

const app = new Koa();
const router = new Router({
	prefix: '/v1/passengers',
});

const response = (
	ctx: Koa.ParameterizedContext<
		any,
		Router.IRouterParamContext<any, Record<string, unknown>>,
		any
	>,
	status: number,
	type: string,
	body: Record<string, any>
) => {
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
	if (
		ctx.request.query.page === undefined ||
		ctx.request.query.size === undefined
	) {
		response(ctx, 406, 'application/json', {
			message: 'Not enough details provided.',
		});
		return;
	}
	const arr = Object.values(passengers);
	const page = Number(ctx.request.query.page);
	const size = Number(ctx.request.query.size);
	const totalpassengers = arr.length;
	let pages;
	if (totalpassengers % size !== 0) {
		pages = Math.floor(totalpassengers / size) + 1;
	}
	else {
		pages = totalpassengers / size;
	}
	if (page + 1 > pages) {
		response(ctx, 416, 'application/json', {
			message: 'Query parameters out of range.',
		});
		return;
	}
	const dataArray = arr.slice(
		page * size,
		Math.min((page + 1) * size, totalpassengers)
	);
	const body = {
		totalPassengers: totalpassengers,
		totalPages: pages,
		data: dataArray,
	};
	response(ctx, 200, 'application/json', {
		message: 'Request fulfiled.',
		content: body,
	});
});

const validate = (body: Record<string, any>, callback1: Ajv.ValidateFunction, callback2: Ajv.ValidateFunction) => {
	if (!callback1(body))
		return false;
	const arr: Array<aline> | aline = body.airline;
	if (!Array.isArray(arr)) {
		return callback2(arr);
	}
	const len = arr.length;
	for (let i = 0; i < len; i++) {
		if (!callback2(arr[i]))
			return false;
	}
	return true;
};

router.post('/', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const body: any = ctx.request.body;
	if (!validate(body, isValid, isValid2)) {
		response(ctx, 406, 'application/json', {
			message: 'Not enough details provided./Wrong format data!',
		});
		return;
	}
	const newEntry1: Record<string, any> = { _id: uuid.v4() };
	const newEntry: entry = Object.assign(newEntry1, body);
	passengers[newEntry._id] = newEntry;
	const json = JSON.stringify(passengers);
	fs.writeFile('passengers.json', json, 'utf8', (err) => {
		if (err) {
			throw err;
		}
	});
	response(ctx, 201, 'application/json', {
		message: 'Entry added Successfully.',
		content: newEntry,
	});
});

router.put('/:id', (ctx) => {
	console.log('Got request =>', {
		method: ctx.request.method,
		path: ctx.request.url,
		body: ctx.request.body,
	});
	const id = ctx.params.id;
	if (!Object.prototype.hasOwnProperty.call(passengers, id)) {
		response(ctx, 400, 'application/json', {
			message: 'Entry with Id : :id does not exist in database.',
		});
		return;
	}
	const body: any = ctx.request.body;
	if (!validate(body, isValid3, isValid4)) {
		response(ctx, 406, 'application/json', {
			message: 'Not enough details provided./Wrong format data!',
		});
		return;
	}
	Object.keys(body).forEach((val) => {
		passengers[id][val] = body[val];
	});
	const json = JSON.stringify(passengers);
	fs.writeFile('passengers.json', json, 'utf8', (err) => {
		if (err) {
			throw err;
		}
	});
	response(ctx, 202, 'application/json', {
		message: 'Entry updated Successfully.',
		content: passengers[id],
	});
});

app.use(bodyparser());
app.use(router.routes());
app.use(async (ctx) => {
	ctx.status = 400;
	ctx.type = 'application/json';
	ctx.body = { message: 'Page not found!' };
});

const port = 3000;
export const server = app.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);
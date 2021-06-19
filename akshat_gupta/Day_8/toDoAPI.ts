import { IncomingMessage, ServerResponse } from 'http';
import http = require('http');
import uuid = require('uuid');
const port = 3001;
class entry {
    public id: string;
    public createdDate: string;
    public title: string;
    public completed: boolean;
    constructor() {this.id = '0'; this.createdDate = new Date().toJSON().slice(0, 10); this.title = '0000';	this.completed = true;
    }
}
let toDoList: Array<entry> = [];
http.createServer(function (req: IncomingMessage, res: ServerResponse) {
	console.log('Got request =>', { method: req.method, path: req.url, contentType: req.headers['content-type']});
	if (req.url!.substr(0, 5) !== '/todo') {
		res.writeHead(404);
		res.end('Bad Request!');
	}
	else if (req.method === 'GET') {
		if (req.url!.length === 5)
			getAll(req, res);
		else
			getOne(req, res);
	}
	else if (req.method === 'PUT')
		attachBodyToRequest(req, res, update);
	else if (req.method === 'POST')
		attachBodyToRequest(req, res, create);
	else if (req.method === 'DELETE')
		deleteOne(req, res);
	else {
		res.writeHead(404);
		res.end('Bad Request!');
	}
}).listen(port, function () {
	console.log('server started at port', port);
});
const getAll = function (req: IncomingMessage, res: ServerResponse) {
	if (toDoList.length === 0) {
		res.end('Nothing to Display.');
		return;
	}
	res.writeHead(200);
	const data = JSON.stringify(toDoList);
	res.end(data);
};
const getOne = function (req: IncomingMessage, res: ServerResponse) {
	res.writeHead(200);
	const str: string = req.url!;
	const tempId = str.substr(6);
	let data = new entry();
	let flag = 0;
	toDoList.every(function (value) {
		if (value['id'] === tempId) {
			data = value;
			flag = 1;
			return false;
		}
	});
	if (flag === 0 )
		res.write('Entry does not exist in list.');
	else
		res.write(JSON.stringify(data));
	res.end();
};
const update = function (req: IncomingMessage, res: ServerResponse, Body: string) {
	const body = JSON.parse(Body);
	if (req.url!.substr(5) === '') {
		res.writeHead(404);
		res.end('Bad Request!');
		return;
	}
	res.writeHead(200);
	const str: string = req.url!;
	const tempId = str.substr(6);
	let data = new entry();
	let flag = 0;
	toDoList.every(function (value) {
		if (value['id'] === tempId) {
			if (body.title !== undefined)
				value['title'] = body['title'];
			if (body['completed'] !== undefined)
				value['completed'] = body['completed'];
			data = value;
			flag = 1;
			return false;
		}
		return true;
	});
	if (flag === 0) {
		res.write('Entry does not exist in list.');
	}
	else {
		res.write('Successfully Updated!\n');
		res.write(JSON.stringify(data));
	}
	res.end();
};
const create = function (req: IncomingMessage, res: ServerResponse, Body: string) {
	const body = JSON.parse(Body);
	if (req.url!.substr(5) !== '') {
		res.writeHead(404);
		res.end('Bad Request!');
		return;
	}
	res.writeHead(200); // http header
	if (body['title'] === undefined) {
		res.end('Could not create entry due to lack of info!');
		return;
	}
	const data = {
		'id': uuid.v4(),
		'createdDate': new Date().toJSON().slice(0, 10),
		'title': body['title'],
		'completed': false
	};
	toDoList.push(data);
	res.write('New Entry Creation Successful!');
	res.end();
};
const deleteOne = (req: IncomingMessage, res: ServerResponse) => {
	if (req.url!.substr(5) === '') {
		res.writeHead(404);
		res.end('Bad Request!');
		return;
	}
	res.writeHead(200); // http header
	const str: string = req.url!;
	const tempId = str.substr(6);
	let flag = 0;
	const tempArray: Array<entry> = [];
	toDoList.every(function (value) {
		if (value['id'] !== tempId)
			tempArray.push(value);
		else
			flag = 1;
		return true;
	});
	toDoList = [];
	toDoList = tempArray.slice();
	if (flag === 0)
		res.write('Entry does not exist in list.');

	else
		res.write('Deletion Successful!');
	res.end();
};

const attachBodyToRequest = function (req: IncomingMessage, res: ServerResponse, callback: (req: http.IncomingMessage, res: ServerResponse, body: string) => void) {
	let body = '';
	req.on('data', function (data: string) {
		body += data;
	});
	req.on('end', function () {
		callback(req, res, body);
	});
};

import * as error from '../error/error';
import uuid from 'uniqid';
import * as subjects from '../services/subject_services';

export async function addSubject(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	if (typeof obj.name === undefined) {
		error.incompleteError(ctx);
		return;
	}
	if(typeof obj.name !== 'string') {
		error.wrongFormatError(ctx);
		return;
	}
	try {
		const id = uuid('SUB');
		const newSubject = await subjects.addSubject(id, obj.name);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Subject added Successfully.',
			data: newSubject,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getSubject(ctx: any): Promise<any> {
	try {
		const allSubject = await subjects.getSubject();
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			data: allSubject,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

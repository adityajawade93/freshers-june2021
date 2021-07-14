import uuid from 'uniqid';
import * as subjects from '../services/subject_services';

export async function addSubject(ctx: any) {
	const obj = ctx.request.body;
	if (obj.name == null) {
		ctx.response.status = 400;
		ctx.body = {
			msg: 'properties of subject not defined',
		};
		return;
	}
	try {
		const id = uuid('SUB');
		const newSubject = await subjects.addSubject(id, obj.name);
		ctx.response.status = 200;
		ctx.body = {
			msg: 'subject added',
			data: newSubject,
		};
	} catch (err) {
		ctx.body = {
			msg: `something wrong while adding subject + ${err}`,
		};
	}
}

export async function getSubject(ctx: any) {
	try {
		ctx.response.status = 200;
		const allSubject = await subjects.getSubject();
		ctx.body = {
			data: allSubject,
		};
	} catch (err) {
		ctx.response.status = 400;
		ctx.body = {
			msg: `something went worng in getting all subjects + ${err}`,
		};
	}
}

import uuid from 'uniqid';
import * as classes from '../services/class_services';
import * as error from '../error/error';
import Joi from 'joi';

export async function addClass(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	const schema = Joi.object({
		subjectId: Joi.string().required(),
		room: Joi.string().required()
	});
	try {
		await schema.validateAsync({ subjectId: obj.subjectId, room: obj.room });
		obj.classId = uuid('C');
		const newclass = await classes.addClass(obj.classId, obj.room, obj.subjectId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Class added Successfully.',
			data: newclass,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getClass(ctx: any): Promise<any> {
	try {
		ctx.response.status = 200;
		const allClasses = await classes.getClass();
		ctx.body = {
			msg: 'List of all classes...',
			data: allClasses,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

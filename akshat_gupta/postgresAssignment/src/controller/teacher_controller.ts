import uuid from 'uniqid';
import * as teacher from '../services/teacher_services';
import * as error from '../error/error';
import Joi from 'joi';

export async function addTeacher(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	const schema = Joi.object({
		name: Joi.string().required(),
		gender: Joi.string()
			.valid('M', 'F')
			.required(),
		phone: Joi.string().required(),
		subjectId: Joi.string().required()
	});
	try {
		await schema.validateAsync({ name: obj.name, gender: obj.gender, phone: obj.phone, classId: obj.subjectId });
		const id = uuid('T');
		const newTeacher = await teacher.addTeacher(id, obj.name, obj.gender, obj.phone, obj.subjectId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Teacher added Successfully.',
			data: newTeacher,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getTeacher(ctx: any): Promise<any> {
	try {
		const allTeachers = await teacher.getTeacher();
		ctx.response.status = 200;
		ctx.body = {
			message: 'All teachers retrieved.',
			data: allTeachers,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

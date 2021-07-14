import uuid from 'uniqid';
import * as teacher from '../services/teacher_services';

const errorMessage = (ctx: any, err: any) => {
	ctx.response.status = 400;
	ctx.response.type = 'application/json';
	ctx.body = {
		message: `Something went wrong: ${err}`,
	};
};

export async function addTeacher(ctx: { request: { body: any; }; response: { status: number; type: string; }; body: { msg: string; data_added?: any; }; }) {
	const obj = ctx.request.body;
	if (obj.name == null || obj.sex == null || obj.phone == null || obj.subjectID == null) {
		ctx.response.status = 400;
		ctx.response.type = 'application/json';
		ctx.body = {
			msg: 'Invalid fields.',
		};
		return;
	}

	try {
		const id = uuid('T');
		const newTeacher = await teacher.addTeacher(id, obj.name, obj.sex, obj.phone, obj.subjectID);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			msg: 'Teacher added Successfully.',
			data_added: newTeacher,
		};
	} catch (err) {
		errorMessage(ctx, err);
	}
}

export async function getTeacher(ctx: { response: { status: number; }; body: { msg: string; data?: any; }; }) {
	try {
		const allTeachers = await teacher.getTeacher();
		ctx.response.status = 200;
		ctx.body = {
			msg: 'All teachers retrieved.',
			data: allTeachers,
		};
	} catch (err) {
		errorMessage(ctx, err);
	}
}

import uuid from 'uniqid';
import * as student from '../services/student_services';
import * as error from '../error/error';
import Joi from 'joi';

export async function addStudent(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	const schema = Joi.object({
		name: Joi.string().required(),
		gender: Joi.string()
			.valid('M', 'F')
			.required(),
		phone: Joi.string().required(),
		classId: Joi.string().required()
	});
	try {
		await schema.validateAsync({ name: obj.name, gender: obj.gender, phone: obj.phone, classId: obj.classId });
		const id: string = uuid('S');
		const newStudent = await student.addStudent(id, obj.name, obj.gender, obj.phone, obj.classID);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Student added Successfully.',
			data: newStudent,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getStudent(ctx: any): Promise<any> {
	const { page } = ctx.request.query;
	const { size } = ctx.request.query;

	if (typeof page === undefined || typeof size === undefined) {
		error.missingQueryError(ctx);
		return;
	}

	if (Number.isNaN(page) || Number.isNaN(size)) {
		error.wrongQueryError(ctx);
		return;
	}

	const totalstudent: any = await student.getStudentCount();
	const totalpages: number = Math.ceil(totalstudent / size);

	if (page < 0 || page >= totalpages || size === 0) {
		error.wrongQueryError(ctx);
		return;
	}

	try {
		const allStudent = await student.getStudent(page, size);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'All students retrieved.',
			body: allStudent,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}
export async function getStudentFromClassID(ctx: any): Promise<any> {
	try {
		const { classId } = ctx.request.params;
		if (typeof classId === undefined) {
			error.missingQueryError(ctx);
			return;
		}

		if (typeof classId !== 'string') {
			error.wrongQueryError(ctx);
			return;
		}

		const requiredStudent = await student.getStudentFromClassID(classId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Requested student details retrieved.',
			data: requiredStudent,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getStudentFromSubjectID(ctx: any): Promise<any> {
	try {
		const { subjectId } = ctx.request.params;
		if (typeof subjectId === undefined) {
			error.missingQueryError(ctx);
			return;
		}

		if (typeof subjectId !== 'string') {
			error.wrongQueryError(ctx);
			return;
		}
		const requiredStudent = await student.getStudentFromSubjectID(subjectId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Requested student details retrieved.',
			data: requiredStudent,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getStudentFromTeacherID(ctx: any): Promise<any> {
	try {
		const { teacherId } = ctx.request.params;
		if (typeof teacherId === undefined) {
			error.missingQueryError(ctx);
			return;
		}

		if (typeof teacherId !== 'string') {
			error.wrongQueryError(ctx);
			return;
		}
		const requiredStudent = await student.getStudentFromTeacherID(teacherId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Requested student details retrieved.',
			data: requiredStudent,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

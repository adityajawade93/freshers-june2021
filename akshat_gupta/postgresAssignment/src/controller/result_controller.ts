import * as results from '../services/result_services';
import * as error from '../error/error';
import Joi from 'joi';

export async function addMarks(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	const schema = Joi.object({
		studentId: Joi.string().required(),
		subjectId: Joi.string().required(),
		marks: Joi.number().required()
	});
	try {
		await schema.validateAsync({ studentId: obj.studentId, subjectId: obj.subjectId, marks: obj.marks });
		const added_marks = await results.addMarks(obj.studentId, obj.subjectId, obj.marks);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			msg: 'Marks added.',
			data: added_marks,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function updateMarks(ctx: any): Promise<any> {
	const obj = ctx.request.body;
	const schema = Joi.object({
		studentId: Joi.string().required(),
		subjectId: Joi.string().required(),
		marks: Joi.number().required()
	});
	try {
		await schema.validateAsync({ studentId: obj.studentId, subjectId: obj.subjectId, marks: obj.marks });
		const updated_marks = await results.updateMarks(obj.studentId, obj.subjectId, obj.marks);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Marks updated.',
			data: updated_marks,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getMarks(ctx: any): Promise<any> {
	try {
		const { studentId } = ctx.request.params;
		if (typeof studentId === undefined) {
			error.missingQueryError(ctx);
			return;
		}

		if (typeof studentId !== 'string') {
			error.wrongQueryError(ctx);
			return;
		}
		const markslist = await results.getMarks(studentId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: `All subjects' marks for student: ${studentId}...`,
			data: markslist,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getHighestMarksPerSubject(ctx: any): Promise<any> {
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
		const report = await results.getHighestMarksPerSubject(classId);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: `Highest marks per subject for class: ${classId}`,
			data: report,
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

export async function getToppersMarks(ctx: any): Promise<any> {
	const { classId } = ctx.request.params;
	const { toplimit } = ctx.request.params;
	if (typeof classId === undefined || typeof toplimit === undefined) {
		error.missingQueryError(ctx);
		return;
	}

	if (typeof classId !== 'string' || typeof toplimit !== 'string') {
		error.wrongQueryError(ctx);
		return;
	}
	try {
		const listoftopten = await results.getToppersMarks(classId, toplimit);
		ctx.response.status = 200;
		ctx.response.type = 'application/json';
		ctx.body = {
			message: 'Successful',
			data: listoftopten
		};
	} catch (err) {
		error.pureError(ctx, err);
	}
}

import { Context } from 'vm';
import * as subjectService from '../services/subject-service';
import * as markService from '../services/mark-service';


export async function addMarks(ctx: Context) {
	try {
		const requestData = ctx.request.body;

		// const student_id: string = requestData.student_id;
		//const subject_name: string = requestData.subject_name.toLowerCase();
		// const marks: number = requestData.marks;
		// const subject_id: string = requestData.subject_id;

		//await markService.addMark(student_id, subject_id, marks);
		await markService.addMark(requestData);
		ctx.status = 201;
		ctx.body = {
			message: `marks for student with ${requestData.studentid} is added`,
		};
	} catch (e) {
		ctx.status = 404;
		ctx.body = { error: e.message };
	}
}

export async function updateMarks(ctx: Context) {
	try {
		const requestData = ctx.request.body;
		// const student_id: string = requestData.student_id;
		// const subject_name: string = requestData.subject_name.toLowerCase();
		// const marks: number = requestData.marks;
		// const subject_id: string = await subjectService.getSubjectId(subject_name);

		await markService.updateMark(requestData);
		ctx.body = {
			message: `marks for student with ${requestData.studentid} is updated`,
		};
	} catch (e) {
		ctx.status = 404;
		ctx.body = { error: e.message };
	}
}

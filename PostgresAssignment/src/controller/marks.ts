import { Context } from "vm";
import {
	getMarksOfStudent as get_marks_of_student,
	updateMarks as update_marks,
	addMarks as add_marks,
	highestMarksInSubject as highest_marks_in_subjects,
	topper as _topper,
} from "../services/marks";
import { marksSchema } from "../helper/validation";

interface marksI {
	studentId: string;
	subjectId: string;
	marks: number;
}

export async function getMarksOfStudent(ctx: Context): Promise<void> {
	const studentId: string = ctx.request.params.studentId;
	try {
		const marksObtained = await get_marks_of_student(studentId);
		ctx.response.status = 200;
		ctx.body = {
			msg: `all subject marks for studentID ${studentId}`,
			marks: marksObtained,
		};
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function updateMarks(ctx: Context) {
	const obj = ctx.request.body;
	try {
		const response = marksSchema.validate(obj);
		if (response.error) {
			ctx.response.status = 400;
			ctx.body = response.error.details[0].message;
			return;
		}
		const updatedMarks = await update_marks(
			obj.studentId,
			obj.subjectId,
			obj.marks
		);
		ctx.response.status = 201;
		ctx.body = {
			msg: "data updated",
			data: updatedMarks,
		};
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function addMarks(ctx: any): Promise<void> {
	const obj = ctx.request.body;
	try {
		const response = await marksSchema.validate(obj);
		if (response.error) {
			ctx.response.status = 400;
			ctx.body = response.error.details[0].message;
			return;
		}
		const addedMarks = await add_marks(obj.studentID, obj.subjectID, obj.marks);
		ctx.response.status = 201;
		ctx.body = {
			msg: "marks added",
			data: addedMarks,
		};
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function highestMarksInSubject(ctx: Context): Promise<void> {
	const subjectId: string = ctx.request.params.subjectId;
	try {
		const marks = await highest_marks_in_subjects(subjectId);
		ctx.response.status = 200;
		ctx.body = {
			data: marks,
		};
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function topper(ctx: Context): Promise<void> {
	const topperCount: number = ctx.request.params.topperCount;
	try {
		const toppers = await _topper(topperCount);
		ctx.response.status = 200;
		ctx.body = toppers;
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

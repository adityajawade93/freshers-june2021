import { Context } from "vm";
import {
	getSubject as get_subject,
	studentOfSubject as student_of_subject,
	addSubject as add_subejct,
} from "../services/subject";
import { subjectSchema } from "../helper/validation";

interface subjectI {
	name: string;
	classId: string;
	teacherId: string;
}

export async function getSubject(ctx: Context): Promise<void> {
	try {
		const allSubject = await get_subject();
		ctx.body = {
			message: "Data fetched successfully",
			count: allSubject.length,
			data: allSubject,
		};
	} catch (e) {
		ctx.status = 500;
		ctx.body = { error: e.message };
	}
}

export async function getStudentOfSubject(ctx: Context): Promise<void> {
	const subjectId: string = ctx.request.params.subjectId;
	try {
		const requestedStudent = await student_of_subject(subjectId);
		ctx.response.status = 200;
		ctx.body = requestedStudent;
	} catch (e) {
		ctx.status = 500;
		ctx.body = { error: e.message };
	}
}

export async function addSubject(ctx: Context): Promise<void> {
	const obj: subjectI = ctx.request.body;
	try {
		const response = await subjectSchema.validate(obj);
		if (response.error) {
			ctx.response.status = 422;
			ctx.body = response.error.details[0].message;
			return;
		}
		const addedSubject = await add_subejct(
			obj.name,
			obj.classId,
			obj.teacherId
		);
		ctx.response.status = 201;
		ctx.body = {
			msg: "New Student added",
			dataAdded: addedSubject,
		};
	} catch (e) {
		ctx.status = 500;
		ctx.body = { error: e.message };
	}
}

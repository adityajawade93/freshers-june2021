import { validatePage } from "../helper/index";
import { Context } from "vm";
import {
	getStudentCount,
	allStudents,
	addStudent as add_student,
} from "../services/student";

interface paginationInterface {
	limit: number;
	offset: number;
}

import { studentSchema, studentParamsSchema } from "../helper/validation";
interface studentI {
	name: string;
	classId: string;
	sex: string;
	phone: string;
}
interface studentParamsI {
	page: number;
	size: number;
}
export async function getStudent(ctx: Context): Promise<void> {
	const obj: studentParamsI = ctx.request.query;
	const response = await studentParamsSchema.validate(obj);
	if (response.error) {
		ctx.response.status = 400;
		ctx.body = response.error.details[0].message;
		return;
	}
	const validParams: boolean = validatePage(obj.page, obj.size);

	try {
		const totalStudent: number = await getStudentCount();
		const boundary: paginationInterface = { offset: 0, limit: totalStudent };
		// if the page and offset is not valid

		if (validParams) {
			boundary.offset = obj.size;
			boundary.limit = obj.page * obj.size;
		}

		const allstudent = await allStudents(boundary.offset, boundary.limit);

		ctx.status = 200;
		ctx.body = {
			total_students: totalStudent,
			data: allstudent,
		};
	} catch (e) {
		ctx.status = !e.status ? 500 : e.status;
		ctx.body = { error: e.message };
	}
}

export async function addStudent(ctx: Context): Promise<void> {
	const obj: studentI = ctx.request.body;
	const response = await studentSchema.validate(obj);
	if (response.error) {
		ctx.response.status = 400;
		ctx.body = response.error.details[0].message;
		return;
	}

	try {
		const addedStudent = await add_student(
			obj.name,
			obj.sex,
			obj.phone,
			obj.classId
		);
		ctx.response.status = 201;
		ctx.body = {
			msg: "New student is added",
			data_added: addedStudent,
		};
	} catch (e) {
		ctx.status = !e.status ? 500 : e.status;
		ctx.body = { error: e.message };
	}
}

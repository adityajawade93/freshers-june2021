import { Context } from "vm";
import {
	allteacher,
	studentOfteacher as student_of_teacher,
	addTeacher as add_teacher,
} from "../services/teachers";

import { teacherSchema } from "../helper/validation";

export async function getTeachers(ctx: Context): Promise<void> {
	try {
		const response = await allteacher();
		ctx.response.status = 200;
		ctx.body = {
			msg: "List of all the teachers",
			data: response,
		};
		return;
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function studentOfteacher(ctx: Context): Promise<void> {
	const teacherId: string = ctx.request.params.teacherId;
	try {
		const requiredStudent = await student_of_teacher(teacherId);
		ctx.response.status = 200;
		ctx.body = requiredStudent;
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

export async function addTeacher(ctx: Context): Promise<void> {
	const obj = ctx.request.body;
	try {
		const response = await teacherSchema.validate(obj);
		if (response.error) {
			ctx.response.status = 400;
			ctx.body = response.error.details[0].message;
			return;
		}
		const newTeacher = await add_teacher(obj.name, obj.sex, obj.phone);
		ctx.response.status = 200;
		ctx.body = {
			msg: "teacher added",
			dataAdded: newTeacher,
		};
	} catch (e) {
		ctx.status = 500;

		if (e.status) ctx.status = e.status;
		ctx.body = { error: e.message };
	}
}

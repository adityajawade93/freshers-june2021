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

import { studentSchema } from "../helper/validation";
interface student {
	name: string;
	classId: string;
	sex: string;
	phone: string;
}

export async function getStudent(ctx: Context) {
	try {
		const page = parseInt(ctx.request.query.page);
		const size = parseInt(ctx.request.query.size);
		const validParams: boolean = validatePage(page, size);

		const totalStudent: number = await getStudentCount();
		// console.log(totalStudent)

		const boundary: paginationInterface = { offset: 0, limit: totalStudent };
		// if the page and offset is not valid

		if (validParams) {
			boundary.offset = size;
			boundary.limit = page * size;
		}

		const allstudent = await allStudents(boundary.offset, boundary.limit);

		ctx.status = 200;
		ctx.body = {
			total_students: totalStudent,
			data: allstudent.rows,
		};
	} catch (e) {
		ctx.status = 404;
		ctx.body = `Some Error occured while fetching the student data: ${e.message}`;
	}
}

export async function addStudent(ctx: Context) {
	try {
		const obj: student = ctx.request.body;
		console.log(obj);
		const response = await studentSchema.validate(obj);
		console.log(response);
		if (response.error) {
			ctx.response.status = 422;
			ctx.body = response.error.details[0].message;
			return;
		}

		const addedStudent = await add_student(
			obj.name,
			obj.sex,
			obj.phone,
			obj.classId
		);
		ctx.response.status = 200;
		ctx.body = {
			msg: "New student is added",
			data_added: addedStudent,
		};
	} catch (e) {
		ctx.response.status = 400;
		ctx.body = {
			msg: `something went wrong in adding students ${e}`,
		};
	}
}

import { Context } from "vm";
import {
	getClasses as get_classes,
	studentOfClass as student_of_classes,
	addClass as add_class,
} from "../services/class";
import { classSchema } from "../helper/validation";

interface classI {
	name: string;
	room: number;
}

export async function getClass(ctx: Context): Promise<void> {
	try {
		const allClasses = await get_classes();
		ctx.response.status = 200;
		ctx.body = {
			count: allClasses.length,
			data: allClasses,
		};
	} catch (e) {
		ctx.status = !e.status ? 500 : e.status;
		ctx.body = { error: e.message };
	}
}

export async function studentsOfClass(ctx: Context): Promise<void> {
	const classId: string = ctx.params.classId;
	try {
		const requiredStudent = await student_of_classes(classId);
		ctx.response.status = 200;
		ctx.body = {
			msg: "required student detail",
			data: requiredStudent,
		};
	} catch (e) {
		ctx.status = !e.status ? 500 : e.status;
		ctx.body = { error: e.message };
	}
}

export async function addClass(ctx: Context): Promise<void> {
	const obj: classI = ctx.request.body;
	const response = await classSchema.validate(obj);
	if (response.error) {
		ctx.response.status = 400;
		ctx.body = response.error.details[0].message;
		return;
	}
	try {
		const classAdded = await add_class(obj.name.toLowerCase(), obj.room);
		ctx.response.status = 201;
		ctx.body = {
			msg: "A new class added",
			data: classAdded,
		};
	} catch (e) {
		ctx.status = !e.status ? 500 : e.status;
		ctx.body = { error: e.message };
	}
}

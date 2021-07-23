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

export async function getClass(ctx: Context) {
	try {
		const allClasses = await get_classes();
		ctx.response.status = 200;
		ctx.body = {
			msg: "list of all classes",
			data: allClasses,
		};
	} catch (e) {
		ctx.response.status = 400;
		ctx.body = {
			msg: `something went wrong in getting classes + ${e}`,
		};
	}
}

export async function studentsOfClass(ctx: Context) {
	try {
		const classId = ctx.params.classId;
		const requiredStudent = await student_of_classes(classId);
		ctx.response.status = 200;
		ctx.body = {
			msg: "required student detail",
			data: requiredStudent,
		};
	} catch (e) {
		ctx.response.status = 400;
		ctx.body = {
			error: `something went wrong in getting student from class ID + ${e}`,
		};
	}
}

export async function addClass(ctx: Context) {
	try {
		const obj: classI = ctx.request.body;
		const response = await classSchema.validate(obj);
		if (response.error) {
			ctx.response.status = 422;
			ctx.body = response.error.details[0].message;
			return;
		}
		const classAdded = await add_class(obj.name, obj.room);
		ctx.response.status = 200;
		ctx.body = {
			msg: "A new class added",
			data: classAdded,
		};
	} catch (e) {
		ctx.response.status = 404;
		ctx.body = {
			msg: `something  went wrong while adding class  + ${e}`,
		};
	}
}

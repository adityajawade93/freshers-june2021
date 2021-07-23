import Joi from "joi";

export const studentSchema = Joi.object({
	name: Joi.string()
		.trim()
		.required()
		.min(3)
		.max(25), //min length max length
	classId: Joi.string()
		.uuid()
		.required(),
	sex: Joi.string()
		.lowercase()
		.trim()
		.valid(null, "male", "female", "others"),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
});

export const classSchema = Joi.object({
	name: Joi.string()
		.trim()
		.required()
		.min(3)
		.max(25), //min length max length
	room: Joi.number()
		.positive()
		.required(),
});

export const subjectSchema = Joi.object({
	name: Joi.string()
		.trim()
		.required()
		.min(3)
		.max(25), //min length max length
	classId: Joi.string()
		.uuid()
		.required(),
	teacherId: Joi.string()
		.uuid()
		.required(),
});

export const teacherSchema = Joi.object({
	name: Joi.string()
		.trim()
		.required()
		.min(3)
		.max(25), //min length max length
	sex: Joi.string()
		.lowercase()
		.trim()
		.valid(null, "male", "female", "others"),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
});

export const marksSchema = Joi.object({
	studentId: Joi.string()
		.uuid()
		.required(),
	subjectId: Joi.string()
		.uuid()
		.required(),
	marks: Joi.number()
		.positive()
		.min(0)
		.max(100)
		.required(),
});

import Joi from "joi";

export const classNoSchema = Joi.object({
  classNumber: Joi.number().required().min(1).max(12),
});

export const marksInputSchema = Joi.object({
  subject_id: Joi.string().trim().required().max(50),
  student_id: Joi.string().trim().required().max(50),
  marks: Joi.number().required().min(0).max(100),
});

export const fetchTopBYNumberSchema = Joi.object({
  number: Joi.number().required().min(0),
});

export const studentIDSchema = Joi.object({
  student_id: Joi.string().trim().required().max(50),
});

export const teacherIDSchema = Joi.object({
  teacher_id: Joi.string().trim().required().max(50),
});

export const subjectIDSchema = Joi.object({
  subject_id: Joi.string().trim().required().max(50),
});

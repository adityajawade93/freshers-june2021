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

export const marksNoSchema = Joi.object({
  marks: Joi.number().required().max(0).max(100),
});

export const subjectIDSchema = Joi.object({
  subject_id: Joi.string().trim().required().max(50),
});

export const studentModifySchema = Joi.object({
  fname: Joi.string().trim().min(3).max(25),
  lname: Joi.string().trim().min(3).max(25),
  age: Joi.number().min(1).max(110),
  class_number: Joi.number().min(1).max(12),
  student_id: Joi.string().trim().required().max(50),
});

export const teacherModifySchema = Joi.object({
  fname: Joi.string().trim().min(3).max(25),
  lname: Joi.string().trim().min(3).max(25),
  age: Joi.number().min(1).max(110),
  teacher_id: Joi.string().trim().required().max(50),
});

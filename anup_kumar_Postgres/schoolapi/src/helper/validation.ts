import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  classId: Joi.string().required(),
  sex: Joi.string().required(),
  phone: Joi.string().required()
});

export const classSchema = Joi.object({
  name: Joi.string().required(),
  room: Joi.number().required()
});

export const subjectSchema = Joi.object({
  name: Joi.string().required(),
  classId: Joi.string().required(),
  teacherId: Joi.string().required()
});

export const teacherSchema = Joi.object({
  name: Joi.string().required(),
  sex: Joi.string().required(),
  phone: Joi.string().required()
});

export const marksSchema = Joi.object({
  studentId: Joi.string().required(),
  subjectId: Joi.string().required(),
  marks: Joi.number().required()
});

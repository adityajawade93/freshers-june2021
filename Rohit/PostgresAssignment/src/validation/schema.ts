const Joi = require("joi");

export const studentSchema = Joi.object().keys({
  studentId: Joi.number().required(),
  name: Joi.string().trim().required().min(4).max(30),
  dob: Joi.date().required(),
  gender: Joi.string()
    .lowercase()
    .trim()
    .valid(null, "male", "female", "others"),
});

export const subjectSchema = Joi.object().keys({
  subjectId: Joi.number().required(),
  subject_name: Joi.string().trim().required().min(2).max(20),
});

export const teacherSchema = Joi.object().keys({
  teacherId: Joi.number().required(),
  teacher_fname: Joi.string().trim().required().min(4).max(30),
  teacher_lname: Joi.string().trim().required().min(4).max(30),
  gender: Joi.string()
    .lowercase()
    .trim()
    .valid(null, "male", "female", "others"),
});

export const classSchema = Joi.object().keys({
  classId: Joi.number().required(),
  stId: Joi.number().required(),
});

export const scheduleSchema = Joi.object().keys({
  cls_Id: Joi.number().required(),
  subjId: Joi.number().required(),
  subject_name: Joi.string().trim().required().min(2).max(20),
  teach_Id: Joi.number().required(),
  teacher_fname: Joi.string().trim().required().min(4).max(30),
});

export const resultSchema = Joi.object().keys({
  studentid: Joi.number().required(),
  class_Id: Joi.number().required(),
  subject_Id: Joi.number().required(),
  marks: Joi.number().required(),
});

export const updateResultSchema = Joi.object().keys({
  studentid: Joi.number().required(),
  subject_Id: Joi.number().required(),
  marks: Joi.number().required(),
});

export const topIdSchema = Joi.object({
  classId: Joi.number().required(),
  subjectId: Joi.number().required(),
});


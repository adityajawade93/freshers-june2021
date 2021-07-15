const Joi = require('joi');

const studentSchema : object = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().max(1).required(),
  phone: Joi.number().required(),
  classID: Joi.number().required(),
});

const classSchema = Joi.object({
  classID: Joi.number().required(),
  room: Joi.number().required(),
  subjectID: Joi.string().required(),
});

const subjectSchema = Joi.object({
  name: Joi.string().required(),
});

const teacherSchema = Joi.object({
  name: Joi.string().required(),
  sex: Joi.string().max(1).required(),
  phone: Joi.number().required(),
  subjectID: Joi.string().required(),
});

const resultSchema = Joi.object({
  studentID: Joi.string().required(),
  subjectID: Joi.string().required(),
  marks: Joi.number().required(),
});

module.exports = {
  studentSchema,
  classSchema,
  subjectSchema,
  teacherSchema,
  resultSchema,
};

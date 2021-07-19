const Joi = require('joi');

const studentSchema : object = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  phone: Joi.string().required(),
  classID: Joi.string().required(),
});

const classSchema = Joi.object({
  classID: Joi.string().required(),
  room: Joi.string().required(),
  subjectID: Joi.string().required(),
});

const subjectSchema = Joi.object({
  name: Joi.string().required(),
});

const teacherSchema = Joi.object({
  name: Joi.string().required(),
  sex: Joi.string().valid('male', 'female', 'others').required(),
  phone: Joi.string().required(),
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

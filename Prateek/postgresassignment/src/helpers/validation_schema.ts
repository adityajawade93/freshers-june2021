const Joi = require("joi");

//Class
const classSchema = Joi.number().greater(0).required();

//General
const generalSchema = Joi.number().required();

//result
const updateresultSchema = Joi.object({
  roll_num: Joi.number().required(),
  subcode: Joi.number().required(),
  marks: Joi.number().required(),
});

const resultSchema = Joi.object({
  resultsid: Joi.number().required(),
  roll_num: Joi.number().required(),
  subcode: Joi.number().required(),
  staffid: Joi.number().required(),
  standard: Joi.number().required(),
  marks: Joi.number().required(),
});

//Schedule

const scheduleSchema = Joi.object({
  uniclassid: Joi.string().required(),
  Standard: Joi.number().required(),
  classno: Joi.number().required(),
  subcode: Joi.number().required(),
  subject: Joi.string().required(),
  staffid: Joi.number().required(),
  T_fname: Joi.string().required(),
});

//Student
const studentSchema = Joi.object({
  roll_num: Joi.number().required(),
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  standard: Joi.number().required(),
  subcode: Joi.number().required(),
});

//Teacher
const getstudentbyidSchema = Joi.number().required();

const teacherSchema = Joi.object({
  staffid: Joi.number().required(),
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  subcode: Joi.number().required(),
});

//Subject
const getstudentbysubjectSchema = Joi.number().required();


const subjectSchema = Joi.object({
    subcode: Joi.number().required(),
    subject: Joi.string().required(),
    staffid: Joi.number().required(),
  });


module.exports = {
  classSchema,
  generalSchema,
  resultSchema,
  updateresultSchema,
  scheduleSchema,
  studentSchema,
  teacherSchema,
  getstudentbyidSchema,
  subjectSchema,
  getstudentbysubjectSchema
};

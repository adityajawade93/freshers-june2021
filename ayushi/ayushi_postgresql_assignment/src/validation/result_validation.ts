export{};
const Joi = require('joi');

const subjectmarksByStudentSchema = Joi.object({
  student_id: Joi.number().integer().required()
});

const topstudentWithSubjectSchema = Joi.object({
  class_id: Joi.number().integer().required()
});

module.exports = {subjectmarksByStudentSchema, topstudentWithSubjectSchema};

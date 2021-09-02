export{};
const Joi = require('joi');

const addScheduleSchema = Joi.object({
  class_id: Joi.number().integer().required(),
  subject_id: Joi.number().integer().required(),
  teacher_id: Joi.number().integer().required(),
});

const studentsbyClassSchema = Joi.object({
  class_id: Joi.number().integer().required()
});

const studentsbyTeacherSchema = Joi.object({
  teacher_id: Joi.number().integer().required()
});

const studentsbySubjectSchema = Joi.object({
  subject_id: Joi.number().integer().required()
});

module.exports = {addScheduleSchema, studentsbyClassSchema, studentsbyTeacherSchema, studentsbySubjectSchema};

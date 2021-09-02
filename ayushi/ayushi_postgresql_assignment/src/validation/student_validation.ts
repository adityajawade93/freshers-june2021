const Joi = require('joi');

const getStudentListSchema = Joi.object({
  page: Joi.number().integer().min(1).max(10),
  limit: Joi.number().integer().min(1)
});

const getstudentInfoByStudentIdSchema = Joi.object({
  studentId: Joi.number().integer().required()
});

const addOrUpdateStudentToListSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  student_name: Joi.string().trim().required(),
  student_dob: Joi.date().required(),
  student_address: Joi.string().trim().required(),
  student_gender: Joi.string().trim().valid('male','female','others').required(),
  student_phone: Joi.number().integer().required()
});

module.exports = {getStudentListSchema, getstudentInfoByStudentIdSchema, addOrUpdateStudentToListSchema};

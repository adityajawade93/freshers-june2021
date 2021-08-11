export{};
const Joi = require('joi');

const addOrUpdateTeacherToListSchema = Joi.object({
  teacher_id: Joi.number().integer().required(),
  teacher_name: Joi.string().trim().required(),
  teacher_dob: Joi.date().required(),
  teacher_address: Joi.string().trim().required(),
  teacher_gender: Joi.string().trim().valid('male','female','others').required(),
  teacher_phone: Joi.number().integer().required()
});

exports.modules = {addOrUpdateTeacherToListSchema};

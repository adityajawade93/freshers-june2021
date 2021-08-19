export{};
const Joi = require('joi');

const addstudentToClassListSchema = Joi.object({
  student_id: Joi.number().integer().required(),
  class_id: Joi.number().integer().required()
});

const getstudentsByClassSchema = Joi.object({
  class_id: Joi.number().integer().required()
});

module.exports = {addstudentToClassListSchema, getstudentsByClassSchema};

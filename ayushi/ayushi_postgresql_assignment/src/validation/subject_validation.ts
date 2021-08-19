export{};
const Joi = require('joi');

const addOrUpdateSubjectToListSchema = Joi.object({
  subject_id: Joi.number().integer().required(),
  subject_name: Joi.string().trim().required(),
});

module.exports = {addOrUpdateSubjectToListSchema};

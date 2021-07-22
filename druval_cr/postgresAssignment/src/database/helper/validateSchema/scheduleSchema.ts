import Joi from 'joi';

const scheduleSchema = Joi.object().keys({
  subject_name: Joi.string().trim().required(),
  class_name: Joi.string().trim().required(),
  teacher_id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export default scheduleSchema;

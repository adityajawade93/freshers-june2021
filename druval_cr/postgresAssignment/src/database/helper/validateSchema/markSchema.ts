import Joi from 'joi';

const classSchema = Joi.object().keys({
  subject_name: Joi.string().trim().required(),
  marks: Joi.number().min(0).max(100).required(),
  student_id: Joi.string().guid({ version: 'uuidv4' }).required(),
});

export default classSchema;

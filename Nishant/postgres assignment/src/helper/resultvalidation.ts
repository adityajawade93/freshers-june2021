import Joi from 'joi';

const updateResultSchema = Joi.object({
  studentid: Joi.number().required(),
  subjectid: Joi.number().required(),
  marks: Joi.number().min(0).max(100).required(),
});

const addResultSchema = Joi.object({
  result_id: Joi.number().required(),
  studentid: Joi.number().required(),
  subjectid: Joi.number().required(),
  marks: Joi.number().required(),
  clas_id: Joi.number().required(),
});

export { updateResultSchema, addResultSchema };

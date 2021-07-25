import Joi from 'joi';

const addClassScheduleSchema = Joi.object().keys({
  class_id: Joi.number().required(),
  classno: Joi.number().required,
  subj_id: Joi.number().required,
  subj_name: Joi.string().required,
  t_id: Joi.number().required,
  t_fname: Joi.string().required,
});

export default addClassScheduleSchema;

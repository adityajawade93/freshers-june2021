import Joi from 'joi';

const addClassScheduleSchema = Joi.object().keys({
  classid: Joi.number().required(),
  classno: Joi.number().positive().required(),
  subj_id: Joi.number().required(),
  subj_name: Joi.string().required(),
  t_id: Joi.number().required(),
  t_fname: Joi.string().required(),
});

export default addClassScheduleSchema;

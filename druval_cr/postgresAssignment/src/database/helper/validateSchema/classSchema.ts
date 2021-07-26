import Joi from 'joi';

const classSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
});

export default classSchema;

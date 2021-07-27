import Joi from 'joi';

const subjectSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
});

export default subjectSchema;

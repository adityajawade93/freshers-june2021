import Joi from 'joi';

const studentSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  sex: Joi.string().lowercase().trim().valid(null, 'male', 'female'),
  age: Joi.number(),
});

export default studentSchema;

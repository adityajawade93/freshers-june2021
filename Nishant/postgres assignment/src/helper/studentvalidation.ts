import Joi from 'joi';

const addStudentSchema = Joi.object().keys({
  student_id: Joi.number().required(),
  fname: Joi.string().trim().required(),
  mname: Joi.string().trim(),
  lname: Joi.string().trim().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  address: Joi.string().trim().required(),
});

export default addStudentSchema;

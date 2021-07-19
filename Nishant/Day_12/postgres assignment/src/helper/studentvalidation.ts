import Joi from 'joi';

const addStudentSchema = Joi.object().keys({
  student_id: Joi.number().required(),
  fname: Joi.string().trim().required(),
  mname: Joi.string().trim().required(),
  lname: Joi.string().trim().required(),
  dob: Joi.string().trim().required(),
  gender: Joi.string().max(1).required(),
  address: Joi.string().trim().required(),
});

export default addStudentSchema;

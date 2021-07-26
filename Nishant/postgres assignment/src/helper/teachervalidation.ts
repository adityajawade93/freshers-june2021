import Joi from 'joi';

const getStudentByTeacherIdSchema = Joi.object().keys({
  teacherId: Joi.number().required,
});

const addTeacherSchema = Joi.object().keys({
  teacher_id: Joi.number().required(),
  fname: Joi.string().trim().required(),
  mname: Joi.string().trim().required(),
  lname: Joi.string().trim().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  address: Joi.string().trim().required(),
});

export { getStudentByTeacherIdSchema, addTeacherSchema };

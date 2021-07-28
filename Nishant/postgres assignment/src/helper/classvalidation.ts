import Joi from 'joi';

const getStudentByClassIdSchema = Joi.object({
  classId: Joi.number().required(),
});

const addStudentInClassSchema = Joi.object({
  class_id: Joi.number().required(),
  studid: Joi.number().required,
});

export { getStudentByClassIdSchema, addStudentInClassSchema };

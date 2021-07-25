import Joi from 'joi';

const getStudentBySubjectIdSchema = Joi.object().keys({
  subjectId: Joi.number().required,
});

const getSubjectMarksBySubjectIdSchema = Joi.object().keys({
  studentId: Joi.number().required(),
});

const addSubjectSchema = Joi.object().keys({
  subject_id: Joi.number().required(),
  subject_name: Joi.number().required,
});

export { getStudentBySubjectIdSchema, getSubjectMarksBySubjectIdSchema, addSubjectSchema };

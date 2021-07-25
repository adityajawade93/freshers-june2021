import Joi from 'joi';

const gettopperByclassIdAndSubjectIdSchema = Joi.object({
  classId: Joi.number().required(),
  subjectId: Joi.number().required(),
});

const getTopStudentSchema = Joi.object({
  classId: Joi.number().required(),
  count: Joi.number().required,
});

export { gettopperByclassIdAndSubjectIdSchema, getTopStudentSchema };

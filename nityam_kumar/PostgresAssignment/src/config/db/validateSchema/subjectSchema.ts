import Joi from "joi";

const subjectSchema = Joi.object().keys({
  subject_name: Joi.string().trim().required(),
  teacher_id: Joi.string().trim().required().max(50),
  class_number: Joi.number().required().min(1),
});

export default subjectSchema;

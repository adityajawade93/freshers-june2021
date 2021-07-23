import Joi from "joi";

const subjectSchema = Joi.object().keys({
  subject_name: Joi.string().trim().required().min(3).max(15),
  teacher_id: Joi.string().trim().required().max(50),
  class_number: Joi.number().required().min(1).max(12),
});

export default subjectSchema;

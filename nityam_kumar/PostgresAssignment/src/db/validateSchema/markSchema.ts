import Joi from "joi";

const markSchema = Joi.object().keys({
  subject_id: Joi.string().trim().required().max(50),
  student_id: Joi.string().trim().required().max(50),
  teacher_id: Joi.string().trim().required().max(50),
  class_number: Joi.number().required().min(1).max(12),
  marks: Joi.number().min(0).max(100),
});

export default markSchema;

import Joi from "joi";

const studentSchema = Joi.object().keys({
  fname: Joi.string().trim().required(),
  lname:Joi.string().trim().required(),
  sex: Joi.string().lowercase().trim().valid(null, "m", "f"),
  age: Joi.number().required().min(1).max(110),
  class_number:Joi.number().required().min(1),
});

export default studentSchema;

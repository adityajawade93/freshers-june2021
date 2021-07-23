import Joi from "joi";

const studentSchema = Joi.object().keys({
  fname: Joi.string().trim().required().min(3).max(25),
  lname: Joi.string().trim().required().min(3).max(25),
  sex: Joi.string().lowercase().trim().valid(null, "m", "f", "M", "F"),
  age: Joi.number().required().min(1).max(110),
  class_number: Joi.number().required().min(1).max(12),
});

export default studentSchema;

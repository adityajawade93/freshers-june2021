import Joi from "joi";

const studentSchema = Joi.object().keys({
  fname: Joi.string().trim().required(),
  lname:Joi.string().trim().required(),
  sex: Joi.string().lowercase().trim().valid(null, "m", "f"),
  age: Joi.number().required(),
  class_number:Joi.number().required(),
});

export default studentSchema;

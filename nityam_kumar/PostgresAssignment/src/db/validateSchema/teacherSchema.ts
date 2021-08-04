import Joi from "joi";

const teacherSchema = Joi.object().keys({
  fname: Joi.string().trim().required().min(3).max(25),
  lname: Joi.string().trim().required().min(3).max(25),
  sex: Joi.string().lowercase().trim().valid(null, "o", "m", "f"),
  age: Joi.number().required().min(1).max(110),
  dob: Joi.date().required(),
});

export default teacherSchema;

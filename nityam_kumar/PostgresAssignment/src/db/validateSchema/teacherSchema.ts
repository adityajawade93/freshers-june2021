import Joi from "joi";

const teacherSchema = Joi.object().keys({
  fname: Joi.string().trim().required(),
  lname: Joi.string().trim().required(),
  sex: Joi.string().trim().valid(null, "m", "f", "M", "F"),
  age: Joi.number().required().min(1).max(110),
});

export default teacherSchema;

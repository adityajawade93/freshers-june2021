import Joi from "joi";

const teacherSchema = Joi.object().keys({
  fname: Joi.string().trim().required(),
  lname: Joi.string().trim().required(),
  sex: Joi.string().lowercase().trim().valid(null, "m", "f"),
  age: Joi.number().required(),
});

export default teacherSchema;

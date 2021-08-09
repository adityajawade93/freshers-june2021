import Joi from "joi";

const paginationSchema = Joi.object({
  page: Joi.number().required().min(1),
  size: Joi.number().required().min(1).max(500),
});

export default paginationSchema;

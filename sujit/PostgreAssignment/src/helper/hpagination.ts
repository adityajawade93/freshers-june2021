import Joi from "joi";

export const pagination_schema = Joi.object().keys({
    page: Joi.number().integer().required(),
    size: Joi.number().integer().required()
})
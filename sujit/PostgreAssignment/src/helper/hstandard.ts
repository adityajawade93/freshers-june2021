import Joi from "joi";

export const standard_schema = Joi.object().keys({
    class_level: Joi.number().integer().max(12).required()
})
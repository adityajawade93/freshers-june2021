import Joi from "joi";

export const subject_sechma = Joi.object().keys({
    subname: Joi.string().trim().regex(/^[a-zA-z]{4,20}$/).required()
})
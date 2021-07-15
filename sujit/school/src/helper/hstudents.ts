import Joi from "joi";

export const students_sechma = Joi.object().keys({

    fname: Joi.string().trim().required(),
    lname: Joi.string().trim(),
    dateofbirth: Joi.date()
})
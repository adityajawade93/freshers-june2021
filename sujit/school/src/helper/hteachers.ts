import Joi from "joi";

export const teachers_sechma = Joi.object().keys({

    tfname: Joi.string().trim().required(),
    tlname:  Joi.string().trim(),
    tsubject_id: Joi.string().trim().required(),
    joindate : Joi.date()
})
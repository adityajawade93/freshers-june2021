import Joi from "joi";

const idpattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/

export const teachers_sechma = Joi.object().keys({

    tfname: Joi.string().trim().regex(/^[a-zA-z]{4,20}$/).required(),
    tlname:  Joi.string().trim().regex(/^[a-zA-z]{4,20}$/),
    tsubject_id: Joi.string().trim().regex(idpattern).required(),
    joindate : Joi.date()
})
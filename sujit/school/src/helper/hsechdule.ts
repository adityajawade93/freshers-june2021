import Joi from "joi";

const idpattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/

export const sechdule_sechma = Joi.object().keys({

    subjectname: Joi.string().trim().regex(/^[a-zA-z]{4,20}$/).required(),
    teacher_id: Joi.string().trim().regex(idpattern).required(),
    classid: Joi.string().trim().regex(idpattern).required()
})
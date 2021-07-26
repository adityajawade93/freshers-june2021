import Joi from "joi";

const idpattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/

export const marksechma = Joi.object().keys({
    rstudent_id: Joi.string().trim().regex(idpattern).required(),
    rstudent_class_id: Joi.string().trim().regex(idpattern).required(),
    rsubject_id:Joi.string().trim().regex(idpattern).required(),
    rmarks:Joi.number().integer().max(100).required()
})
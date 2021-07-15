import Joi from "joi";

export const marksechma = Joi.object().keys({
    rstudent_id: Joi.string().trim().required(),
    rstudent_class_id: Joi.string().trim().required(),
    rsubject_id:Joi.string().trim().required(),
    rmarks:Joi.number().integer().max(100).required()
})
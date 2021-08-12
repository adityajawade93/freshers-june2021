import Joi from "joi";

const idpattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/
export const student_class_sechma = Joi.object().keys({
    cstudentid: Joi.string().trim().max(36).regex(idpattern).required(),
    student_classid: Joi.string().trim().max(36).regex(idpattern).required()
})
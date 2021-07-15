import Joi from "joi";

export const student_class_sechma = Joi.object().keys({
    cstudentid: Joi.string().trim().required(),
    student_class_id: Joi.string().trim().required()
})
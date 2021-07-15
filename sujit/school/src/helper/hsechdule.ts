import Joi from "joi";

export const sechdule_sechma = Joi.object().keys({

    subjectname: Joi.string().trim().required(),
    teacher_id: Joi.string().trim().required(),
    classid: Joi.string().trim().required()
})
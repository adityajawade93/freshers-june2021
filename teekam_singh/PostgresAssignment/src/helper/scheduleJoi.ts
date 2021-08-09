import * as Joi from 'joi';

export const scheduleSchema = Joi.object({
    classId: Joi.string().required(),
    subjectId: Joi.string().required(),
    teacherId: Joi.string().required()
})
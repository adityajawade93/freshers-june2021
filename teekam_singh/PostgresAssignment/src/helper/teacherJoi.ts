import * as Joi from 'joi';

export const teacherSchema = Joi.object({
    name: Joi.string().required(),
    subjectId: Joi.string().required()
})

export const teacherIdSchema = Joi.object({
    teacherId: Joi.string().required()
})
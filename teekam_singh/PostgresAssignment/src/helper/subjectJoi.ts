import * as Joi from 'joi';

export const subjectSchema = Joi.object({
    name: Joi.string().required()
})

export const subjectIdSchema = Joi.object({
    subjectId: Joi.string().required()
})
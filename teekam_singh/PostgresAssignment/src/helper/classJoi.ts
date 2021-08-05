import * as Joi from 'joi';

export const classSchema = Joi.object({
    name: Joi.string().required()
})

export const classIdSchema = Joi.object({
    classId: Joi.string().required()
})
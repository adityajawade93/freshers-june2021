import * as Joi from 'joi';

export const studentSchema = Joi.object({
    name: Joi.string().required()
})

export const studentToClassSchema = Joi.object({
    studentId: Joi.string().required(),
    classId: Joi.string().required()
})

export const studentListSchema = Joi.object({
    page: Joi.number().integer().min(0).required(),
    size: Joi.number().integer().min(1).required()
})
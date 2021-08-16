import * as Joi from 'joi';

export const resultSchema = Joi.object({
    classId: Joi.string().required(),
    subjectId: Joi.string().required(),
    marks: Joi.number().integer().min(0).max(100).required(),
    studentId: Joi.string().required()
})

export const marksByStudentIdSchema = Joi.object({
    studentId: Joi.string().length(17).required()
})

export const highestMarksSchema = Joi.object({
    classId: Joi.string().length(17).required(),
    subjectId: Joi.string().length(17).required()
})

export const topNstudentsSchema = Joi.object({
    limit: Joi.number().integer().min(1).required()
})
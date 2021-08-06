import Joi from 'joi';

export const studentSchema = Joi.object().keys({
    name: Joi.string().trim().required(),
    rollno: Joi.number(),
    address: Joi.string(),
});

export const classScheduleSchema = Joi.object().keys({
    ssid: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
});

export const teacherSchema = Joi.object().keys({
    name: Joi.string().required(),
    contactno: Joi.number().required(),
    specialization : Joi.string(),
});

export const subjectSchema = Joi.object().keys({
    name: Joi.string().required(),
    tid : Joi.string(),
    atid: Joi.string(),
    
});

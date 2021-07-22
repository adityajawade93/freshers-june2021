import Joi from 'joi';

const markSchema = Joi.object().keys({
    studentid: Joi.string().uuid().required(),
    subid: Joi.string().uuid().required(),
    marks: Joi.number().required().positive().min(0).max(100),  //positive integers range 0-100
});

export default markSchema;
import Joi from 'joi';

const markSchema = Joi.object().keys({
    studentid: Joi.string().uuid().required(),
    subid: Joi.string().uuid().required(),
    marks: Joi.number().required(),
});

export default markSchema;
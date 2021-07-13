import Joi from 'joi';

const teacherSchema = Joi.object().keys({
    name: Joi.string().required(),
    sex: Joi.string().required(),
    age: Joi.number().required(),
    subid: Joi.string().uuid().required(),

});

export default teacherSchema;
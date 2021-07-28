import Joi from 'joi';

const teacherSchema = Joi.object().keys({
    name: Joi.string().required().min(3).max(25),
    sex: Joi.string().required().valid(null, 'male', 'female', 'others'),
    dob: Joi.date().required(),
    subid: Joi.string().uuid().required(),

});

export default teacherSchema;
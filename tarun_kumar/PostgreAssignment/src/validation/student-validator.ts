import Joi from 'joi';



const studentSchema = Joi.object().keys({
    name: Joi.string().trim().required().min(3).max(25),//min length max length
    sex: Joi.string().lowercase().trim().valid(null, 'male', 'female', 'others'),
    dob: Joi.date().required(),//change to dob
    classid: Joi.string().uuid().required(),
});

export default studentSchema;
import Joi from 'joi';

const subjectSchema = Joi.object().keys({

    name: Joi.string().required().min(3).max(25),
});

export default subjectSchema;
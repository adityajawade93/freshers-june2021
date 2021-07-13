import Joi from 'joi';

const subjectSchema = Joi.object().keys({

    name: Joi.string().required(),
});

export default subjectSchema;
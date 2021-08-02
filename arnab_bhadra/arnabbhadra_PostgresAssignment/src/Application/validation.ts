import Joi from 'joi';

export const portNumberValidation = Joi.object().keys({
    port: Joi.number().required(),
});

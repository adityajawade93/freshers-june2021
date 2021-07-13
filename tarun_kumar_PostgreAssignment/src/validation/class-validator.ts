import Joi from 'joi';



const classSchema = Joi.object().keys({

    name: Joi.string().required(),

});

export default classSchema;
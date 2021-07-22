import Joi from 'joi';



const classSchema = Joi.object().keys({

    name: Joi.number().required().positive(),

});

export default classSchema;
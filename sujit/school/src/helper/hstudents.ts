import Joi from "joi";

const pattern = /[a-zA-z](0-20)/
export const students_sechma = Joi.object().keys({
    fname: Joi.string().trim().max(20,'utf8').regex(pattern).required(),
    lname: Joi.string().trim().max(20,'utf8').regex(pattern),
    dateofbirth: Joi.date()
})

//FIXME : add regex and length validation and date validation 
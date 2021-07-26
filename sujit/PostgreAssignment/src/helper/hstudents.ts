import Joi from "joi";

const pattern = /^[a-zA-z]{0,20}$/
export const students_sechma = Joi.object().keys({
    fname: Joi.string().trim().max(20, 'utf8').regex(pattern).required(),
    lname: Joi.string().trim().max(20, 'utf8').regex(pattern),
    dateofbirth: Joi.date().custom((value, helper) => {
        if (between(value.getFullYear(), 1995, 2003) && between(value.getMonth() + 1, 1, 12) && between(value.getDate(), 1, 31)) {
            return true
        } else {
            throw new Error("give a proper date")
        }
    })
})
// Fixme:custom validation in joi
//FIXME : add regex and length validation and date validation 
function between(x: number, min: number, max: number) {
    return x >= min && x <= max;
}
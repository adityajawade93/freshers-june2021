import Joi from "joi";

const idpattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/

export const teachers_sechma = Joi.object().keys({

    tfname: Joi.string().trim().regex(/^[a-zA-z]{4,20}$/).required(),
    tlname: Joi.string().trim().regex(/^[a-zA-z]{4,20}$/),
    tsubject_id: Joi.string().trim().regex(idpattern).required(),
    joindate: Joi.date().custom((value, helper) => {
        if (between(value.getFullYear(), 1990,new Date().getFullYear() ) && between(value.getMonth() + 1, 1, 12) && between(value.getDate(), 1, 31)) {
            return true
        } else {
            throw new Error("give a proper date")
        }
    })
})

function between(x: number, min: number, max: number) {
    return x >= min && x <= max;
}
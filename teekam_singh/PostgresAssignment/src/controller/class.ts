import { Context } from 'vm';
import * as services from '../services/class';
import * as Joi from '../helper/classJoi';
import uuid from 'uniqid';


export const createClass = async (ctx: Context): Promise<void> => {
    const requestBody: any = ctx.request.body;
    const result = Joi.classSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    const id: string = uuid();
    try {
        await services.createClass(id, requestBody.name);
        ctx.status = 200;
        ctx.body = "class created."
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const classList = async (ctx: Context): Promise<void> => {
    try {
        const res: any = await services.classList();
        if (res.rows.length === 0) {
            ctx.status = 200;
            ctx.body = 'No class exists.';
        }
        else {
            ctx.status = 200;
            ctx.body = res.rows;
        }

    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const studentListFromClassid = async (ctx: Context): Promise<void> => {
    const classId: string = ctx.params.classId;
    const result = Joi.classIdSchema.validate({ classId });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.studentListFromClassid(classId);
        if (res.rows.length === 0) {
            ctx.status = 200;
            ctx.body = 'No student exists in this class.';
        }
        else {
            ctx.status = 200;
            ctx.body = res.rows;
        }
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}
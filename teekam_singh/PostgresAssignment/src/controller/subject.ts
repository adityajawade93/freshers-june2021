import { Context } from 'vm';
import * as services from '../services/subject';
import * as Joi from '../helper/subjectJoi'
import uuid from 'uniqid';

export const createSubject = async (ctx: Context): Promise<void> => {
    const requestBody: any = ctx.request.body;
    const result = Joi.subjectSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    const id: string = uuid();
    try {
        await services.createSubject(id, requestBody.name);
        ctx.status = 200;
        ctx.body = "subject created.";
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const subjectList = async (ctx: Context): Promise<void> => {
    try {
        const res: any = await services.subjectList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const studentListBySubjectId = async (ctx: Context): Promise<void> => {
    const subjectId: string = ctx.params.id;
    const result = Joi.subjectIdSchema.validate({ subjectId });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.studentListBySubjectId(subjectId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}
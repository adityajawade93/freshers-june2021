import { Context } from 'vm';
import * as services from '../services/result';
import * as Joi from '../helper/resultJoi';

interface ResultRequest {
    studentId: string;
    classId?: string;
    subjectId: string;
    marks: number;
}

export const createResult = async (ctx: Context): Promise<void> => {
    const requestBody: ResultRequest = ctx.request.body;
    const result = Joi.resultSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        await services.createResult(requestBody);
        ctx.status = 200;
        ctx.body = "result created.";
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}

export const updateResult = async (ctx: Context): Promise<void> => {
    const requestBody: ResultRequest = ctx.request.body;
    const result = Joi.resultSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        await services.updateResult(requestBody);
        ctx.status = 200;
        ctx.body = "result updated.";
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const marksByStudentId = async (ctx: Context): Promise<void> => {
    const studentId: string = ctx.params.studentId;
    const result = Joi.marksByStudentIdSchema.validate({ studentId });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.marksByStudentId(studentId);
        if (res.rows.length === 0) {
            ctx.status = 200;
            ctx.body = 'Result Not found with this student id.';
        }
        else {
            ctx.status = 200;
            ctx.body = res.rows;
        }
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }

}

export const highestMarks = async (ctx: Context): Promise<void> => {
    const classId: string = ctx.params.classId;
    const subjectId: string = ctx.params.subjectId;
    const result = Joi.highestMarksSchema.validate({ classId, subjectId });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.highestMarks(classId, subjectId);
        if (res.rows.length === 0) {
            ctx.status = 200;
            ctx.body = 'No Result found with this class and subject id.';
        }
        else {
            ctx.status = 200;
            ctx.body = res.rows;
        }
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }

}

export const topNstudents = async (ctx: Context): Promise<void> => {
    const limit: number = Number(ctx.params.limit);
    const result = Joi.topNstudentsSchema.validate({ limit });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.topNstudents(limit);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }
}
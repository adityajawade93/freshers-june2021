import { Context } from 'vm';
import * as services from '../services/result';
import * as Joi from 'joi';

const resultSchema = Joi.object({
    classId: Joi.string().required(),
    subjectId: Joi.string().required(),
    marks: Joi.number().required(),
    studentId: Joi.string().required()
})

const marksByStudentIdSchema = Joi.object({
    studentId: Joi.string().required()
})

const highestMarksSchema = Joi.object({
    classId: Joi.string().required(),
    subjectId: Joi.string().required()
})

const topNstudentsSchema = Joi.object({
    limit: Joi.number().required()
})

interface ResultRequest {
    studentId: string;
    classId?: string;
    subjectId: string;
    marks: number;
}

export const createResult = async (ctx: Context) => {
    try {
        const requestBody: ResultRequest = ctx.request.body;
        await resultSchema.validateAsync(requestBody);
        await services.createResult(requestBody);
        ctx.status = 200;
        ctx.body = "result created.";
    }
    catch (error) {
        ctx.status = 500;
        if (error.isJoi) { ctx.status = 422; }
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}

export const updateResult = async (ctx: Context) => {
    try {
        const requestBody: ResultRequest = ctx.request.body;
        await resultSchema.validateAsync(requestBody);
        await services.updateResult(requestBody);
        ctx.status = 200;
        ctx.body = "result updated.";
    }
    catch (error) {
        ctx.status = 500;
        if (error.isJoi) { ctx.status = 422 }
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const marksByStudentId = async (ctx: Context) => {
    try {
        const studentId: string = ctx.params.studentId;
        await marksByStudentIdSchema.validateAsync({studentId});
        const res: any = await services.marksByStudentId(studentId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.isJoi) { ctx.status = 422 }
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}

export const highestMarks = async (ctx: Context) => {
    try {
        const classId: string = ctx.params.classId;
        const subjectId: string = ctx.params.subjectId;
        await highestMarksSchema.validateAsync({classId, subjectId});
        const res: any = await services.highestMarks(classId, subjectId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.isJoi) { ctx.status = 422 }
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}

export const topNstudents = async (ctx: Context) => {
    try {
        const limit: number = Number(ctx.params.limit);
        await topNstudentsSchema.validateAsync({limit});
        const res: any = await services.topNstudents(limit);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.isJoi) { ctx.status = 422 }
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}
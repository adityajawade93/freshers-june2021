import { Context } from 'vm';
import * as services from '../services/subject';
import uuid from 'uniqid';

export const createSubject = async (ctx: Context) => {
    try {
        const requestBody: any = ctx.request.body;

        if (!requestBody.name) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.name) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        const id: string = uuid();
        await services.createSubject(id, requestBody.name);
        ctx.status = 200;
        ctx.body = "subject created.";
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const subjectList = async (ctx: Context) => {
    try {
        const res: any = await services.subjectList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const studentListBySubjectId = async (ctx: Context) => {
    try {
        const subjectId: string = ctx.params.id;

        if (!subjectId) {
            ctx.status = 400;
            ctx.body = "Please enter subject id.";
            return;
        }
        const res: any = await services.studentListBySubjectId(subjectId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}
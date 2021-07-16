import { Context } from 'vm';
import * as services from '../services/result';

interface ResultRequest {
    studentId: string;
    classId?: string;
    subjectId: string;
    marks: number;
}

export const createResult = async (ctx: Context) => {
    try {
        const requestBody: ResultRequest = ctx.request.body;

        if (!requestBody.studentId || !requestBody.classId || !requestBody.subjectId || !requestBody.marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.studentId) !== 'string' || typeof (requestBody.classId) !== 'string' || typeof (requestBody.subjectId) !== 'string' || typeof (requestBody.marks) !== 'number') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await services.createResult(requestBody);
        ctx.status = 200;
        ctx.body = "result created.";
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}

export const updateResult = async (ctx: Context) => {
    try {
        const requestBody: ResultRequest = ctx.request.body;

        if (!requestBody.studentId || !requestBody.subjectId || !requestBody.marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.studentId) !== 'string' || typeof (requestBody.subjectId) !== 'string' || typeof (requestBody.marks) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        await services.updateResult(requestBody);
        ctx.status = 200;
        ctx.body = "result updated.";
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const marksByStudentId = async (ctx: Context) => {
    try {
        const studentId: string = ctx.params.studentId;

        if (!studentId) {
            ctx.status = 400;
            ctx.body = "Please enter class id and subject id.";
        }
        const res: any = await services.marksByStudentId(studentId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}

export const highestMarks = async (ctx: Context) => {
    try {
        const classId: string = ctx.params.classId;
        const subjectId: string = ctx.params.subjectId;

        if (!classId || !subjectId) {
            ctx.status = 400;
            ctx.body = "Please enter class id and subject id.";
        }
        const res: any = await services.highestMarks(classId, subjectId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}

export const topNstudents = async (ctx: Context) => {
    try {
        const limit: number = Number(ctx.params.limit);
        if (!limit) {
            ctx.status = 400;
            ctx.body = "Please enter number of students.";
        }
        const res: any = await services.topNstudents(limit);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}
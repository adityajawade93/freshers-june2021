import { Context } from 'vm';
import * as services from '../services/teacher';
import uuid from 'uniqid';

interface TeacherRequest{
    name: string;
    subjectId: string;
}

export const createTeacher = async (ctx: Context) => {
    try {
        const requestBody: TeacherRequest = ctx.request.body;

        if (!requestBody.name || !requestBody.subjectId) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.name) !== 'string' || typeof (requestBody.subjectId) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        const id = uuid();
        await services.createTeacher(id, requestBody.name, requestBody.subjectId);
        ctx.status = 200;
        ctx.body = "teacher created.";
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const teacherList = async (ctx: Context) => {
    try {
        const res: any = await services.teacherList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const studentListByTeacherid = async (ctx: Context) => {
    try {
        const teacherId: string = ctx.params.id;
        if (!teacherId) {
            ctx.status = 400;
            ctx.body = "Please enter teacher id.";
        }
        const res: any = await services.studentListByTeacherid(teacherId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

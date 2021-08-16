import { Context } from 'vm';
import * as services from '../services/teacher';
import * as Joi from '../helper/teacherJoi'
import uuid from 'uniqid';

interface TeacherRequest {
    name: string;
    subjectId: string;
}

export const createTeacher = async (ctx: Context): Promise<void> => {
    const requestBody: TeacherRequest = ctx.request.body;
    const result = Joi.teacherSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    const id = uuid();
    try {
        await services.createTeacher(id, requestBody.name, requestBody.subjectId);
        ctx.status = 200;
        ctx.body = "teacher created.";
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const teacherList = async (ctx: Context): Promise<void> => {
    try {
        const res: any = await services.teacherList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

export const studentListByTeacherid = async (ctx: Context): Promise<void> => {
    const teacherId: string = ctx.params.id;
    const result = Joi.teacherIdSchema.validate({ teacherId });
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        const res: any = await services.studentListByTeacherid(teacherId);
        if (res.rows.length === 0) {
            ctx.status = 200;
            ctx.body = 'No student exists with this teacher id.';
        }
        else {
            ctx.status = 200;
            ctx.body = res.rows;
        }
    }
    catch (error) {
        ctx.status = 500;
        // if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}

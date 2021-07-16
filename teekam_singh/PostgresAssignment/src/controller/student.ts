import { Context } from 'vm';
import * as services from '../services/student';
import uuid from 'uniqid';

export const createStudent = async (ctx: Context) => {
    try {
        const requestBody: any = ctx.request.body;

        if (!requestBody.name) {
            ctx.status = 400;
            ctx.body = "Please enter student name";
            return;
        }
        if (typeof (requestBody.name) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter student name in text format";
            return;
        }
        const id: string = uuid();
        await services.createStudent(id, requestBody.name);
        ctx.status = 200;
        ctx.body = `student created with id: ${id}`;
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }

}

export const AddStudentToClass = async (ctx: Context) => {
    try {
        const requestBody: any = ctx.request.body;

        if (!requestBody.studentid || !requestBody.classid) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.studentid) !== 'string' || typeof (requestBody.classid) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        await services.AddStudentToClass(requestBody.studentid, requestBody.classid);
        ctx.status = 200;
        ctx.body = "student has been added to class.";
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}


export const studentList = async (ctx: Context) => {
    try {
        const page: number = Number(ctx.query.page);
        const size: number = Number(ctx.query.size);

        if (!page || !size) {
            ctx.status = 400;
            ctx.body = "Please enter page and size";
            return;
        }
        if (page < 0 || size <= 0) {
            ctx.status = 400;
            ctx.body = "Please page and size in appropriate range";
            return;
        }
        const res: any = await services.studentList(page, size);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if (error.status) { ctx.status = error.status; }
        ctx.body = error.message;
    }
}
import { Context } from 'vm';
import * as services from '../services/student';
import * as Joi from '../helper/studentJoi';
import uuid from 'uniqid';

export const createStudent = async (ctx: Context): Promise<void> => {
    const requestBody: any = ctx.request.body;
    const result = Joi.studentSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    const id: string = uuid();
    try {
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

export const AddStudentToClass = async (ctx: Context): Promise<void> => {
    const requestBody: any = ctx.request.body;
    const result = Joi.studentToClassSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
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


export const studentList = async (ctx: Context): Promise<void> => {
    const page: number = Number(ctx.query.page);
    const size: number = Number(ctx.query.size);
    const result = Joi.studentListSchema.validate({page, size});
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
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
import { Context } from 'vm';
import * as services from '../services/class';
import * as Joi from 'joi';
import uuid from 'uniqid';

const authSchema1 = Joi.object({
    name: Joi.string().required()
})

const authSchema2 = Joi.object({
    classId: Joi.string().required()
})

export const createClass = async (ctx: Context) => {
    try {
        const requestBody: any = ctx.request.body;
        const result = await authSchema1.validateAsync(requestBody);
        const id:string = uuid();
        await services.createClass(id, requestBody.name);
        ctx.status = 200;
        ctx.body = "class created."
    }
    catch (error) {
        ctx.status = 500;
        if(error.isJoi) {ctx.status = 422;}
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const classList = async (ctx: Context) => {
    try {
        const res: any = await services.classList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}

export const studentListFromClassid = async (ctx: Context)=> {
    try {
        const classId: string = ctx.params.classid;
        const result = await authSchema2.validateAsync({classId})
        const res: any = await services.studentListFromClassid(classId);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.isJoi) {ctx.status = 422;}
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }
}
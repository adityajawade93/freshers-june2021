import { Context } from 'vm';
import * as services from '../services/class';
import uuid from 'uniqid';

export const createClass = async (ctx: Context) => {

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
        const id:string = uuid();
        await services.createClass(id, requestBody.name);
        ctx.status = 200;
        ctx.body = "class created."
    }
    catch (error) {
        ctx.status = 500;
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
        const classid: string = ctx.params.classid;
        if (!classid || classid == null) {
            ctx.status = 400;
            ctx.body = "Please enter class id.";
        }
        const res: any = await services.studentListFromClassid(classid);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}
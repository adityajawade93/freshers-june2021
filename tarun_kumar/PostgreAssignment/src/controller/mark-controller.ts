import { Context } from 'vm';

import * as markService from '../services/mark-service';
import markSchema from '../validation/mark-validator';

interface markSchemaI {
    studentid: string,
    subid: string,
    marks: number,
}


export async function addMarks(ctx: Context): Promise<void> {
    const requestData: markSchemaI = ctx.request.body;
    try {

        await markSchema.validateAsync(requestData);
        await markService.addMark(requestData);
        ctx.status = 201;
        ctx.body = {
            message: `marks for student with ${requestData.studentid} is added`,
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = { error: e.message };
    }
}

export async function updateMarks(ctx: Context): Promise<void> {
    const requestData = ctx.request.body;
    try {

        await markService.updateMark(requestData);
        ctx.status = 200;
        ctx.body = {
            message: `marks for student with ${requestData.studentid} is updated`,
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = { error: e.message };
    }
}

import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import * as classService from '../services/class-service';
import classSchema from '../validation/class-validator';

interface classSchemaI {
    name: string,
}

export async function addClass(ctx: Context): Promise<void> {
    const requestData: classSchemaI = ctx.request.body;
    try {

        await classSchema.validateAsync(requestData);

        const id: string = uuidv4();
        const name: string = requestData.name.toLowerCase().trim();

        await classService.addClass(id, name);
        ctx.status = 201;
        ctx.body = {

            message: `class with ${id} and name ${name} is added`,
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e.message };
    }
}

export async function getClasses(ctx: Context): Promise<void> {

    try {
        const allClasses = await classService.getClasses();

        ctx.body = {
            count: allClasses.length,
            data: allClasses
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}


export async function getClassId(ctx: Context): Promise<void> {
    const id: string = ctx.params.id;
    try {

        const classdata = await classService.getClassId(id);

        ctx.status = 200;
        ctx.body = {
            data: classdata
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

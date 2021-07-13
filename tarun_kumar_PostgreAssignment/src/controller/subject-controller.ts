import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import * as subjectService from '../services/subject-service';
import subjectSchema from '../validation/subject-validator';

interface subjectSchemaI {
    id: string,
    name: string,
}

export async function addSubject(ctx: Context): Promise<void> {
    try {
        const requestData: subjectSchemaI = ctx.request.body;
        await subjectSchema.validateAsync(requestData);
        const id: string = uuidv4();
        const name: string = requestData.name.toLowerCase();

        await subjectService.addSubject(id, name);
        ctx.status = 201;
        ctx.body = {
            message: `subject with ${id} is added`,
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = { error: e.message };
    }
}

export async function getSubjects(ctx: Context): Promise<void> {
    try {
        const allSubjects = await subjectService.getSubjects();

        ctx.body = {
            count: allSubjects.length,
            data: allSubjects,
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = { error: e.message };
    }
}
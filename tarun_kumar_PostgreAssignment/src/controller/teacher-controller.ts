import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import * as teacherService from '../services/teacher-service';
import teacherSchema from '../validation/teacher-validator';

interface teacherSchemaI {
    name: string,
    sex: string,
    dob: Date,
    subid: string,
}

export async function addTeacher(ctx: Context): Promise<void> {
    const requestData: teacherSchemaI = ctx.request.body;
    try {

        await teacherSchema.validateAsync(requestData);

        const id: string = uuidv4();
        const name: string = requestData.name.trim();
        const sex: string | null = requestData.sex;
        const dob: Date | null = requestData.dob;
        const subid: string | null = requestData.subid;

        await teacherService.addTeacher(id, name, sex, dob, subid);
        ctx.status = 201;
        ctx.body = {
            message: `teacher with id: ${id} created`,
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e.message };
    }
}

export async function getTeachers(ctx: Context): Promise<void> {
    try {
        const totalTeacher: number = await teacherService.countTeachers();
        const allTeachers = await teacherService.getTeachers();

        ctx.body = {
            total_teachers: totalTeacher,
            data: allTeachers,
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e.message };
    }
}

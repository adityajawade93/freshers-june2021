import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';

import * as studentService from '../services/student-service';


export async function addStudent(ctx: Context) {
    try {
        const requestData = ctx.request.body;

        const id: string = uuidv4();
        const name: string = requestData.name.trim();
        const sex: string | null = requestData.sex;
        const age: number | null = requestData.age;

        await studentService.addStudent(id, name, sex, age);
        ctx.body = {
            message: `student with id: ${id} created`,
        };
    } catch (e) {
        ctx.status = 404;
        if (e.isJoi) ctx.status = 422;
        else if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getStudents(ctx: Context) {
    try {
        const totalStudent: number = await studentService.countStudents();
        const allStudents = await studentService.getStudents();

        ctx.body = {
            total_students: totalStudent,
            data: allStudents,
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getStudentMarks(ctx: Context) {
    try {
        const student_id: string = ctx.params.student_id;
        const studentMarks = await studentService.getStudentMarks(student_id);

        ctx.body = {
            count: studentMarks.length,
            data: studentMarks,
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

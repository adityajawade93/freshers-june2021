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
        const classid: string = requestData.classid;

        await studentService.addStudent(id, name, sex, age, classid);
        ctx.status = 201;
        ctx.body = {
            message: `student with id: ${id} created and name ${name}`,
        };
    } catch (e) {
        ctx.status = 404;
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
        const studentid: string = ctx.params.studentid;
        const studentMarks = await studentService.getStudentMarks(studentid);

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

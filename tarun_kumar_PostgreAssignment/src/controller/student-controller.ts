import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import studentSchema from '../validation/student-validator';
import * as studentService from '../services/student-service';

interface studentBodyI {
    name: string,
    sex: string,
    age: number,
    classid: string,
}

export async function addStudent(ctx: Context): Promise<void> {
    try {
        const requestData: studentBodyI = ctx.request.body;
        //console.log(requestData);
        await studentSchema.validateAsync(requestData);

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

export async function getStudents(ctx: Context): Promise<void> {
    try {
        const page: number = Number.parseInt(ctx.query.page)
        const size: number = Number.parseInt(ctx.query.size);
        //console.log(page + " " + size);
        //const totalStudent: number = await studentService.countStudents();
        const allStudents = await studentService.getStudents(page, size);

        ctx.body = {
            // total_students: totalStudent,
            data: allStudents,
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}


export async function getStudentMarks(ctx: Context): Promise<void> {
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

export async function getStudentClassId(ctx: Context): Promise<void> {
    try {
        const classid: string = ctx.params.classid;
        const studentClass = await studentService.getStudentClassId(classid);

        ctx.body = {
            count: studentClass.length,
            data: studentClass,
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}


export async function getStudentSubjectId(ctx: Context): Promise<void> {
    try {
        const subid: string = ctx.params.subid;
        const studentSub = await studentService.getStudentSubjectId(subid);

        ctx.body = {
            count: studentSub.length,
            data: studentSub
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getStudentTeacherId(ctx: Context): Promise<void> {
    try {
        const teacherid: string = ctx.params.teacherid;
        const student = await studentService.getStudentTeacherId(teacherid);

        ctx.body = {
            count: student.length,
            data: student
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getTopTenMarks(ctx: Context): Promise<void> {//given subject id list top ten students;
    try {
        const subid: string = ctx.params.subid;
        const student = await studentService.getTopTenMarks(subid);

        ctx.body = {
            data: student
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getTopScorerEachSub(ctx: Context): Promise<void> {// list top scorer of each subject;
    try {
        //const subid: string = ctx.params.subid;
        const student = await studentService.getTopScorerEachSub();

        ctx.body = {
            data: student
        };
    } catch (e) {
        ctx.status = 404;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}



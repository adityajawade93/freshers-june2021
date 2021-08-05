import { Context } from 'vm';
import { v4 as uuidv4 } from 'uuid';
import studentSchema from '../validation/student-validator';
import * as studentService from '../services/student-service';

interface studentBodyI {
    name: string,
    sex: string,
    dob: Date,
    classid: string,
}

export async function addStudent(ctx: Context): Promise<void> {
    const requestData: studentBodyI = ctx.request.body;
    try {

        //console.log(requestData);
        await studentSchema.validateAsync(requestData);

        const id: string = uuidv4();
        const name: string = requestData.name.trim();
        const sex: string | null = requestData.sex;
        const dob: Date | null = requestData.dob;
        const classid: string = requestData.classid;

        await studentService.addStudent(id, name, sex, dob, classid);
        ctx.status = 201;
        ctx.body = {
            message: `student with id: ${id} created and name ${name}`,
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e.message };
    }
}

export async function getStudents(ctx: Context): Promise<void> {
    const page: number = Number.parseInt(ctx.query.page)
    const size: number = Number.parseInt(ctx.query.size);
    try {

        //console.log(page + " " + size);
        //const totalStudent: number = await studentService.countStudents();
        const allStudents = await studentService.getStudents(page, size);

        ctx.body = {
            // total_students: totalStudent,
            data: allStudents,
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}


export async function getStudentMarks(ctx: Context): Promise<void> {
    const studentid: string = ctx.params.studentid;
    try {

        const studentMarks = await studentService.getStudentMarks(studentid);

        ctx.body = {
            count: studentMarks.length,
            data: studentMarks,
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getStudentByClassId(ctx: Context): Promise<void> {
    const classid: string = ctx.params.classid;
    try {

        const studentClass = await studentService.getStudentByClassId(classid);

        ctx.body = {
            count: studentClass.length,
            data: studentClass,
        };
    } catch (e) {
        ctx.status = 500; //interval server error
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}


export async function getStudentBySubjectId(ctx: Context): Promise<void> {
    const subid: string = ctx.params.subid;
    try {

        const studentSub = await studentService.getStudentBySubjectId(subid);

        ctx.body = {
            count: studentSub.length,
            data: studentSub
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;

        ctx.body = { error: e.message };
    }
}

export async function getStudentByTeacherId(ctx: Context): Promise<void> {
    const teacherid: string = ctx.params.teacherid;
    try {

        const student = await studentService.getStudentByTeacherId(teacherid);

        ctx.body = {
            count: student.length,
            data: student
        };
    } catch (e) {
        ctx.status = 500;
        if (e.status) ctx.status = e.status;
        ctx.body = { error: e.message };
    }
}

export async function getTopTenMarks(ctx: Context): Promise<void> {//given subject id list top ten students;
    const subid: string = ctx.params.subid;
    try {

        const student = await studentService.getTopTenMarks(subid);

        ctx.body = {
            data: student
        };
    } catch (e) {
        ctx.status = 500;
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
        ctx.status = 500;
        if (e.status) ctx.status = e.status;
        ctx.body = { error: e.message };
    }
}

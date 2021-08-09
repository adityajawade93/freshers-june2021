import * as studentModel from "../Services/StudentModel";
import { page } from "../Middleware/Page";
import { validationPageAndPageSize } from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import { Student } from "../Services/Student";
import { studentSchema } from "../Database/Helper/validation";
import { number } from "joi";

export const getStudentInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    let noOfStudents = await studentModel.getStudentNumber();
    noOfStudents = Number(noOfStudents[0].count);
    const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, noOfStudents);
    if (rangeOfInformation === false) {
        ctx.status = 406;
        ctx.body = message.invalidPageMessage;
    }
    else {
        const studentInfo: any = await studentModel.getStudentInfo();
        const rangeNumber: any = rangeOfInformation;
        ctx.status = 200;
        ctx.body = studentInfo.slice(rangeNumber[0], rangeNumber[1]);
    }
}

export const getStudentInfoByStudentid = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try {
        const studentInfo: any = await studentModel.getStudentInfobyStudentId(id);
        if (studentInfo.length === 0) {
            ctx.status = 404;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }

    }
    catch {
        ctx.status = 500;
        ctx.body = message.errorMessage;
    }

}

export const getStudentInfoByTeacherId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try {
        const studentInfo: any = await studentModel.getStudentInfobyTeacherId(id);
        if (studentInfo.length === 0) {
            ctx.status = 404;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }

    }
    catch {
        ctx.status = 500;
        ctx.body = message.errorMessage;
    }

}

export const getStudentInfoByClassId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try {
        const studentInfo: any = await studentModel.getStudentInfobyClassId(id);
        if (studentInfo.length == 0) {
            ctx.status = 404;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }
    }
    catch {
        ctx.status = 500;
        ctx.body = message.errorMessage;
    }

}

export const insertStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    const studentInfo: any = ctx.request.body;

    try {
        await studentSchema.validateAsync(studentInfo);
        let address: string | null = null;
        if (studentInfo.address !== undefined) {
            address = studentInfo.address;
        }
        const studentEntity: Student = {
            sid: uuid.v4(),
            sname: studentInfo.name,
            rollno: studentInfo.rollno,
            address: address
        }
        try {
            await studentModel.insertStudentInfo([studentEntity.sid, studentEntity.sname, studentEntity.rollno, studentEntity.address]);
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch {
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }
    }
    catch {
        ctx.status = 406;
        ctx.body = message.invalidInputMessage;
    }
}
export const getToperBySubject = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try {
        const studentInfo: any = await studentModel.getTopperBySubjectId(id);
        if (studentInfo.length == 0) {
            ctx.status = 404;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }
    }
    catch {
        ctx.status = 500;
        ctx.body = message.errorMessage;
    }

}

export const getTopperOftheClass = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    //@ts-ignore
    if ((!isNaN(id)) && Number(id) >= 0){
        try {
            const studentInfo: any = await studentModel.getToppers(id);
            if (studentInfo.length == 0) {
                ctx.status = 404;
                ctx.body = "No data to send";
            }
            else {
                ctx.status = 200;
                ctx.body = studentInfo;
            }
        }
        catch {
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }
    }
    else{
        ctx.status=404;
        ctx.body = "No data to send";
    }
    

}
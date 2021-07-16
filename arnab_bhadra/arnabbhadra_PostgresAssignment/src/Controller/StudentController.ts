import * as studentModel from "../Services/StudentModel";
import {page} from "../Middleware/Page";
import {validationPageAndPageSize} from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {Student} from "../Services/Student";

export const getStudentInfo = async (ctx: koa.Context, next: koa.Next):Promise<any> => {
    try{
        const studentInfo:any = await studentModel.getStudentInfoFromDB();
        const pageSizeData: page = {
            page: Number(ctx.query.page),
            size: Number(ctx.query.size)
        }
        if (studentInfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no student information.";
        }
        else {
            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, studentInfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = message.invalidPageMessage;
            }
            else {
                ctx.status = 200;
                const rangeNumber:any =rangeOfInformation;
                ctx.body = studentInfo.slice(rangeNumber[0], rangeNumber[1]);
            }
        }
    }
    catch(e){
        ctx.status=400;
        ctx.body=message.errorMessage;
    }
}

export const getStudentInfoByStudentid = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try{
        const studentInfo: any = await studentModel.getStudentInfobyStudentIdFromDB(id);
        if (studentInfo.length === 0) {
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }

    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }

}

export const getStudentInfoByTeacherId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try{
        const studentInfo: any= await studentModel.getStudentInfobyTeacherIdFromDB(id);
        if(studentInfo.lenght==0){
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else{
            ctx.status = 200;
            ctx.body = studentInfo;
        }
        
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }

}

export const getStudentInfoByClassId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try{
        const studentInfo: any = await studentModel.getStudentInfobyClassIdFromDB(id);
        if(studentInfo.lenght==0){
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else{
            ctx.status = 200;
            ctx.body = studentInfo;
        }
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }

}

export const insertStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    const studentInfo: any = ctx.request.body;
    console.log(ctx);
    if (studentInfo !== undefined && studentInfo.name !== undefined && studentInfo.rollno !== undefined) {
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
        try{
            await studentModel.insertStudentInfoIntoDB([studentEntity.sid, studentEntity.sname, studentEntity.rollno, studentEntity.address]);
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 406;
            ctx.body = message.errorMessage;
        }
    }
    else {
        ctx.body = message.invalidInputMessage;
    }
}

export const getToperBySubject = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try{
        let studentInfo: any=await studentModel.getTopperBySubjectIdFromDB(id);
        if(studentInfo.lenght==0){
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else{
            ctx.status = 200;
            ctx.body = studentInfo;
        }
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }

}

export const getTopperOftheClass = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    try{
        const studentInfo: any=await studentModel.getToppersFromDB(id);
        if(studentInfo.lenght==0){
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else{
            ctx.status = 200;
            ctx.body = studentInfo;
        }
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }
    
}
import {page} from "../Middleware/Page";
import {validationPageAndPageSize} from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {Teacher} from "../Services/Teacher";
import * as teacherModel from "../Services/TeacherModel";
import { teacherSchema } from "../Database/Helper/validation";

export const getTeacherInfo = async (ctx: koa.Context, next: koa.Next) : Promise<any>=> {
    const pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }
    
    let noOfTeachers:any = await teacherModel.getNumberOfTeachers();
    noOfTeachers = Number(noOfTeachers[0].count);
    const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, noOfTeachers);
    if (rangeOfInformation === false) {
         ctx.status = 406;
         ctx.body = message.invalidPageMessage;
    }
    else {
        const teacherInfo:any = await teacherModel.getTeacherInfo();
        const rangeNumber:any =rangeOfInformation;
        ctx.status = 200;
        ctx.body = teacherInfo.slice(rangeNumber[0], rangeNumber[1]);
    }
}

export const insertTeacherInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const teacherInfo: any = ctx.request.body;
    
    try{
        await teacherSchema.validateAsync(teacherInfo);
        let specialization: null | string = null;
        if (teacherInfo.specialization !== undefined) {
            specialization = teacherInfo.specialization;
        }
        const teacherEntity: Teacher = {
            tid: uuid.v4(),
            tname: teacherInfo.name,
            contactno: teacherInfo.contactno,
            specialization: specialization
        }
        try{
            await teacherModel.insertTeacherInfo([teacherEntity.tid, teacherEntity.tname, teacherEntity.specialization, teacherEntity.contactno])
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }
    }
    catch(e) {
        //console.log(e.message);
        ctx.status=406;
        ctx.body = message.invalidInputMessage;
    }
}
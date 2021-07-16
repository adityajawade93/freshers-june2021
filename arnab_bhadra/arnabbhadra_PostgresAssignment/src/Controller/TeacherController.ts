import {page} from "../Middleware/Page";
import {validationPageAndPageSize} from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {Teacher} from "../Services/Teacher";
import * as teacherModel from "../Services/TeacherModel";

export const getTeacherInfo = async (ctx: koa.Context, next: koa.Next) : Promise<any>=> {

    const pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }
    try{
        const teacherinfo: any=teacherModel.getTeacherInfoFromDB();
        if (teacherinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no teacher information.";
        }
        else{
            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, teacherinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = message.invalidPageMessage;
            }
            else {
                ctx.status = 200;
                const rangeNumber:any =rangeOfInformation;
                ctx.body = teacherinfo.slice(rangeNumber[0], rangeNumber[1]);
            }
        }
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }
}

export const insertTeacherInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const teacherInfo: any = ctx.request.body;
    if (teacherInfo !== undefined && teacherInfo.name !== undefined && teacherInfo.contactno !== undefined) {
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
            await teacherModel.insertTeacherInfoIntoDB([teacherEntity.tid, teacherEntity.tname, teacherEntity.specialization, teacherEntity.contactno])
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 400;
            ctx.body = message.errorMessage;
        }

    }
    else {
        ctx.status=406;
        ctx.body = message.invalidInputMessage;
    }
}
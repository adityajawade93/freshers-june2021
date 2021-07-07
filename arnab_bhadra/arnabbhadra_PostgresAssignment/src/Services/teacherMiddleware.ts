import {page} from "../Utility/Page";
import {validationPageAndPageSize} from "../Utility/Validation";
import * as message from "../Utility/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {Teacher} from "../Entity/Teacher";
import * as teacherController from "../DBController/TeacherController";

export const getTeacherInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(teacherController.getTeacherInfoFromDB);
    var teacherinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        teacherinfo = data;
        console.log(teacherinfo);
        if (teacherinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no teacher information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, teacherinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = message.invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = teacherinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;

        ctx.body = message.errorMessage;
    });
}

export const insertTeacherInfo = async (ctx: koa.Context, next: koa.Next) => {
    var teacherInfo: any = ctx.request.body;
    if (teacherInfo !== undefined && teacherInfo.name !== undefined && teacherInfo.contactno !== undefined) {
        var specialization: null | string = null;
        if (teacherInfo.specialization !== undefined) {
            specialization = teacherInfo.specialization;
        }
        const teacherEntity: Teacher = {
            tid: uuid.v4(),
            tname: teacherInfo.name,
            contactno: teacherInfo.contactno,
            specialization: specialization
        }
        await teacherController.insertTeacherInfoIntoDB([teacherEntity.tid, teacherEntity.tname, teacherEntity.specialization, teacherEntity.contactno]).then((data) => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch((data) => {
            ctx.status = 406;
            ctx.body = message.errorMessage;
        });
    }
    else {
        ctx.body = message.invalidInputMessage;
    }
}
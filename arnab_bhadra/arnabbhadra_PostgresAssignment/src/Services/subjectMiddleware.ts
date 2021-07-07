import {page} from "../Utility/Page";
import {validationPageAndPageSize} from "../Utility/Validation";
import * as message from "../Utility/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import * as subjectController from "../DBController/SubjectController";
import {Subject} from "../Entity/Subject";

export const insertSubjectInfo = async (ctx: koa.Context, next: koa.Next) => {
    var subjectInfo: any = ctx.request.body;
    if (subjectInfo.name !== undefined) {
        var suid: string | null = uuid.v4();
        var alternatetid: string | null = null;
        var tid: string | null = null;
        if (subjectInfo.tid !== undefined) {
            tid = subjectInfo.tid;
        }
        if (subjectInfo.atid !== undefined) {
            alternatetid = subjectInfo.atid;
        }
        const subjectEntity: Subject = {
            suid: uuid.v4(),
            sname: subjectInfo.name,
            tid: tid,
            alternatetid: alternatetid
        }
        await subjectController.insertSubjectInfoIntoDB([subjectEntity.suid, subjectEntity.sname, subjectEntity.tid, subjectEntity.alternatetid]).then(() => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch(() => {
            ctx.status = 406;
            ctx.body = message.errorMessage;
        });
    }
    else {
        ctx.body = message.invalidInputMessage;
    }
}

export const getSubjectInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(subjectController.getSubjectInfoFromDB);
    var subjectinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        subjectinfo = data;
        console.log(subjectinfo);
        if (subjectinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no subject information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, subjectinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = message.invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = subjectinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });
}
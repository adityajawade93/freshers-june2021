import {page} from "../Middleware/Page";
import {validationPageAndPageSize} from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import * as subjectModel from "../Services/SubjectModel";
import {Subject} from "../Services/Subject";

export const insertSubjectInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const subjectInfo: any = ctx.request.body;
    if (subjectInfo.name !== undefined) {
        const suid: string | null = uuid.v4();
        let alternatetid: string | null = null;
        let tid: string | null = null;
        if (subjectInfo.tid !== undefined) {
            tid = subjectInfo.tid;
        }
        if (subjectInfo.atid !== undefined) {
            alternatetid = subjectInfo.atid;
        }
        const subjectEntity: Subject = {
            suid: suid,
            sname: subjectInfo.name,
            tid: tid,
            alternatetid: alternatetid
        }
        try{
            await subjectModel.insertSubjectInfoIntoDB([subjectEntity.suid, subjectEntity.sname, subjectEntity.tid, subjectEntity.alternatetid]);
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

export const getSubjectInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }
    try{
        const subjectinfo: any=subjectModel.getSubjectInfoFromDB();
        if (subjectinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no subject information.";
        }
        else{
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
    }
    catch{
        ctx.status = 400;
        ctx.body = message.errorMessage;
    }

}
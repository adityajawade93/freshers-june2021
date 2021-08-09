import {page} from "../Middleware/Page";
import {validationPageAndPageSize} from "../Middleware/Validation";
import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import * as subjectModel from "../Services/SubjectModel";
import {Subject} from "../Services/Subject";
import {subjectSchema} from "./../Database/Helper/validation";


export const insertSubjectInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const subjectInfo: any = ctx.request.body;
    //console.log(subjectInfo);
    try{
        await subjectSchema.validateAsync(subjectInfo);
        const suid: string | null = uuid.v4();
        let alternatetid: any = null;
        let tid: any = null;
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
            await subjectModel.insertSubjectInfo([subjectEntity.suid, subjectEntity.sname, subjectEntity.tid, subjectEntity.alternatetid]);
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }
    }
    catch{
        ctx.status=406;
        ctx.body = message.invalidInputMessage;
    }

}

export const getSubjectInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }
    
    let noOfSubjects:any = await subjectModel.getNumberOfSubjects();
    noOfSubjects = Number(noOfSubjects[0].count);
    const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, noOfSubjects);
    if (rangeOfInformation === false) {
         ctx.status = 406;
         ctx.body = message.invalidPageMessage;
    }
    else {
        const subjectInfo:any = await subjectModel.getSubjectInfo();
        const rangeNumber:any =rangeOfInformation;
        ctx.status = 200;
        ctx.body = subjectInfo.slice(rangeNumber[0], rangeNumber[1]);
    }
}
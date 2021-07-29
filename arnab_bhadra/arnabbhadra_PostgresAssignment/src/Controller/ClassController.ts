import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {ClassSchedule} from "../Services/ClassSchedule";
import * as classModel from "../Services/ClassModel";

export const insertClassScheduleInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const classScheduleInfo: any = ctx.request.body;
    if (classScheduleInfo !== undefined && classScheduleInfo.ssid !== undefined && classScheduleInfo.start !== undefined && classScheduleInfo.end !== undefined) {
        const classScheduleEntity: ClassSchedule = {
            cid: uuid.v4(),
            ssid: classScheduleInfo.ssid,
            starttime: classScheduleInfo.start,
            endtime: classScheduleInfo.end
        }
        try{
            classModel.insertClassScheduleInfo([classScheduleEntity.cid, classScheduleEntity.ssid, classScheduleEntity.starttime, classScheduleEntity.endtime])
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }

    }
    else {
        ctx.body = message.invalidInputMessage;
    }
}
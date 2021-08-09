import * as message from "../Middleware/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {ClassSchedule} from "../Services/ClassSchedule";
import * as classModel from "../Services/ClassModel";
import {classScheduleSchema} from "../Database/Helper/validation";
export const insertClassScheduleInfo = async (ctx: koa.Context, next: koa.Next): Promise<any> => {
    const classScheduleInfo: any = ctx.request.body;
    try{
        await classScheduleSchema.validateAsync(classScheduleInfo);
        const classScheduleEntity: ClassSchedule = {
            cid: uuid.v4(),
            ssid: classScheduleInfo.ssid,
            starttime: classScheduleInfo.start,
            endtime: classScheduleInfo.end
        }
        try{
            await classModel.insertClassScheduleInfo([classScheduleEntity.cid, classScheduleEntity.ssid, classScheduleEntity.starttime, classScheduleEntity.endtime])
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }
        catch{
            ctx.status = 500;
            ctx.body = message.errorMessage;
        }
    }
    catch {
        ctx.status =406;
        ctx.body = message.invalidInputMessage;
    }
}
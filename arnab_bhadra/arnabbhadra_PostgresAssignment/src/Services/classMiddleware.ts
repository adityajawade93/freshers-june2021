import {page} from "../Utility/Page";
import {validationPageAndPageSize} from "../Utility/Validation";
import * as message from "../Utility/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {ClassSchedule} from "../Entity/ClassSchedule";
import * as classController from "../DBController/ClassController";

export const insertClassScheduleInfo = async (ctx: koa.Context, next: koa.Next) => {
    var classScheduleInfo: any = ctx.request.body;
    if (classScheduleInfo !== undefined && classScheduleInfo.ssid !== undefined && classScheduleInfo.start !== undefined && classScheduleInfo.end !== undefined) {
        const classScheduleEntity: ClassSchedule = {
            cid: uuid.v4(),
            ssid: classScheduleInfo.ssid,
            starttime: classScheduleInfo.start,
            endtime: classScheduleInfo.end
        }
        await classController.insertClassScheduleInfoIntoDB([classScheduleEntity.cid, classScheduleEntity.ssid, classScheduleEntity.starttime, classScheduleEntity.endtime]).then(() => {
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
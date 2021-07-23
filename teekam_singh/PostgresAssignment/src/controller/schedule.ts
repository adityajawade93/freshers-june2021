import { Context } from 'vm';
import * as services from '../services/schedule';
import * as Joi from '../helper/scheduleJoi';

interface ScheduleRequest{
    classId: string;
    subjectId: string;
    teacherId: string;
}

export const createSchedule = async (ctx: Context): Promise<void> => {
    const requestBody: ScheduleRequest = ctx.request.body;
    const result = Joi.scheduleSchema.validate(requestBody);
    if (result.error) {
        ctx.status = 422;
        ctx.body = result.error.details[0].message;
        return;
    }
    try {
        await services.createSchedule(requestBody);
        ctx.status = 200;
        ctx.body = "schedule created.";
    }
    catch (error) {
        ctx.status = 500;
        if(error.status) {ctx.status = error.status;}
        ctx.body = error.message;
    }

}
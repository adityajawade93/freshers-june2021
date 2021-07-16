import { Context } from 'vm';
import * as services from '../services/schedule';

interface ScheduleRequest{
    classId: string;
    subjectId: string;
    teacherId: string;
}

export const createSchedule = async (ctx: Context) => {
    try {
        const requestBody: ScheduleRequest = ctx.request.body;

        if ( !requestBody.classId || requestBody.subjectId || !requestBody.teacherId) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (requestBody.classId) !== 'string' || typeof (requestBody.subjectId) !== 'string' || typeof (requestBody.teacherId) !== 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
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
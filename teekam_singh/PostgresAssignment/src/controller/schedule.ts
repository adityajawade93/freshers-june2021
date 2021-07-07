const services = require('../services/schedule');

export const createSchedule = async (ctx: any, next: any) => {

    try {
        let req: any = ctx.request.body;
        let sub_id: string = req["sub_id"];
        let class_id: string = req["class_id"];
        let teacher_id: string = req["teacher_id"];

        if (!sub_id || !class_id || !teacher_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (sub_id) != 'string' || typeof (class_id) != 'string' || typeof (teacher_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await services.createSchedule(sub_id, class_id, teacher_id);
        ctx.status = 200;
        ctx.body = "schedule created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}
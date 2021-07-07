const services = require('../services/result');

export const createResult = async (ctx: any, next: any) => {

    try {
        let req: any = ctx.request.body;
        let student_id: string = req["student_id"];
        let class_id: string = req["class_id"];
        let sub_id: string = req["sub_id"];
        let marks: string = req["marks"];

        if (!student_id || !class_id || !sub_id || !marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (student_id) != 'string' || typeof (class_id) != 'string' || typeof (sub_id) != 'string' || typeof (marks) != 'number') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await services.createResult(student_id, class_id, sub_id, marks);
        ctx.status = 200;
        ctx.body = "result created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const updateResult = async (ctx: any, next: any) => {

    try {
        let req: any = ctx.request.body;
        let st_id: string = req["student_id"].trim();
        let sub_id: string = req["sub_id"].trim();
        let marks: number = req["marks"];

        if (!st_id || !sub_id || !marks) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (st_id) != 'string' || typeof (sub_id) != 'string' || typeof (marks) != 'number') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        await services.updateResult(st_id, sub_id, marks);
        ctx.status = 200;
        ctx.body = "result updated.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}

export const MarksStudentid = async (ctx: any, next: any) => {

    try {
        let student_id: string = ctx.query.studentid.toString();

        if (!student_id) {
            ctx.status = 400;
            ctx.body = "Please enter class id and subject id.";
        }
        let res: any = await services.MarksStudentid(student_id);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const highestMarks = async (ctx: any, next: any) => {

    try {
        let class_id: string = ctx.query.classid.toString();
        let sub_id: string = ctx.query.subid.toString();

        if (!class_id || !sub_id) {
            ctx.status = 400;
            ctx.body = "Please enter class id and subject id.";
        }
        let res: any = await services.highestMarks(class_id, sub_id);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const topNstudents = async (ctx: any, next: any) => {
    try {
        let n: number = Number(ctx.query.num);
        if (!n) {
            ctx.status = 400;
            ctx.body = "Please enter number of students.";
        }
        let res: any = await services.topNstudents(n);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}
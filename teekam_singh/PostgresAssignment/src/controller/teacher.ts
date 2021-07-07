const services = require('../services/teacher');


export const createTeacher = async (ctx: any, next: any) => {
    try {
        let req: any = ctx.request.body;
        let id: string = req["id"];
        let name: string = req["name"];
        let sub_id: string = req["sub_id"];

        if (!id || !name || !sub_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (id) != 'string' || typeof (name) != 'string' || typeof (sub_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        await services.createTeacher(id, name, sub_id);
        ctx.status = 200;
        ctx.body = "teacher created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}

export const teacherList = async (ctx: any, next: any) => {

    try {
        let res: any = await services.teacherList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}

export const studentListTeacherid = async (ctx: any, next: any) => {
    try {
        let teacher_id: string = ctx.query.id.toString();
        if (!teacher_id) {
            ctx.status = 400;
            ctx.body = "Please enter teacher id.";
        }
        let res: any = await services.studentListTeacherid(teacher_id);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}

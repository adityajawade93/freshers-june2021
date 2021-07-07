const services = require('../services/subject');

export const createSubject = async (ctx: any, next: any) => {
    try {
        let req: any = ctx.request.body;
        let id: string = req["id"];
        let name: string = req["name"];

        if (!id || !name) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (id) != 'string' || typeof (name) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }

        await services.createSubject(id, name);
        ctx.status = 200;
        ctx.body = "subject created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const subjectList = async (ctx: any, next: any) => {
    try {
        let res: any = await services.subjectList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
 
}

export const studentListSubid = async (ctx: any, next: any) => {
    try {
        let sub_id: string = ctx.query.id.toString();
        if (!sub_id) {
            ctx.status = 400;
            ctx.body = "Please enter subject id.";
        }
        let res: any = await services.studentListSubid(sub_id);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
    
}
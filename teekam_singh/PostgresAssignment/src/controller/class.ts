const services = require('../services/class');

export const createClass = async (ctx: any, next: any) => {

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

        await services.createClass(id, name);
        ctx.status = 200;
        ctx.body = "class created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const classList = async (ctx: any, next: any) => {
    try {
        let res: any = await services.classList();
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const studentListFromClassid = async (ctx: any, next: any) => {

    try {
        let class_id: string = ctx.query.id.toString();
        if (!class_id || class_id == null) {
            ctx.status = 400;
            ctx.body = "Please enter class id.";
        }

        let res: any = await services.studentListFromClassid(class_id);
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}
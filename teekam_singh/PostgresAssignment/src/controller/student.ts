const services = require('../services/student');

export const createStudent = async (ctx: any, next: any) => {

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

        await services.createStudent(id, name);
        ctx.status = 200;
        ctx.body = "student created.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }

}

export const AddStudentToClass = async (ctx: any, next: any) => {

    try {
        let req: any = ctx.request.body;
        let student_id: string = req["student_id"];
        let class_id: string = req["class_id"];

        if (!student_id || !class_id) {
            ctx.status = 400;
            ctx.body = "Please enter all the details";
            return;
        }
        if (typeof (student_id) != 'string' || typeof (class_id) != 'string') {
            ctx.status = 400;
            ctx.body = "Please enter all the details in correct format";
            return;
        }
        await services.AddStudentToClass(student_id, class_id);
        ctx.status = 200;
        ctx.body = "student has been added to class.";
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}


export const studentList = async (ctx: any, next: any) => {
    try {
        let page: number = Number(ctx.query.page);
        let size: number = Number(ctx.query.size);

        if (!page || !size) {
            ctx.status = 400;
            ctx.body = "Please enter page and size";
            return;
        }
        if (page < 0 || size <= 0) {
            ctx.status = 400;
            ctx.body = "Please page and size in appropriate range";
            return;
        }
        let res: any = await services.studentList(page, size); 
        ctx.status = 200;
        ctx.body = res.rows;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        ctx.status = 400;
        ctx.body = "something went wrong";
    }
}
import * as studentController from "../DBController/StudentController";
import {page} from "../Utility/Page";
import {validationPageAndPageSize} from "../Utility/Validation";
import * as message from "../Utility/message";
import * as koa from "koa";
import * as uuid from 'uuid';
import {Student} from "../Entity/Student";

export const getStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(studentController.getStudentInfoFromDB);
    var studentinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        studentinfo = data;
        console.log(studentinfo);
        if (studentinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no student information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, studentinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = message.invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = studentinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;

        ctx.body = message.errorMessage;
    });
}

export const getStudentInfoByStudentid = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await studentController.getStudentInfobyStudentIdFromDB(id).then((data) => {
        studentInfo = data;
        if (studentInfo.length === 0) {
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }

    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });

}


export const getStudentInfoByTeacherId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await studentController.getStudentInfobyTeacherIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });

}

export const getStudentInfoByClassId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await studentController.getStudentInfobyClassIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });

}

export const insertStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    var studentInfo: any = ctx.request.body;
    console.log(ctx);
    if (studentInfo !== undefined && studentInfo.name !== undefined && studentInfo.rollno !== undefined) {
        var address: string | null = null;
        if (studentInfo.address !== undefined) {
            address = studentInfo.address;
        }
        const studentEntity: Student = {
            sid: uuid.v4(),
            sname: studentInfo.name,
            rollno: studentInfo.rollno,
            address: address
        }
        await studentController.insertStudentInfoIntoDB([studentEntity.sid, studentEntity.sname, studentEntity.rollno, studentEntity.address]).then((data) => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch((data) => {
            ctx.status = 406;
            ctx.body = message.errorMessage;
        })
    }
    else {
        ctx.body = message.invalidInputMessage;
    }
}

export const getToperBySubject = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await studentController.getTopperBySubjectIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });
}

export const getTopperOftheClass = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await studentController.getToppersFromDB().then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = message.errorMessage;
    });
}
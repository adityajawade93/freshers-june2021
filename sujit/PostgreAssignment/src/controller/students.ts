import { setPath } from "../database/clientdb"
import * as studentservice from "../services/students"
import * as hstudents from "../helper/hstudents"
import * as hpagination from "../helper/hpagination"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"



export type Istudent = {
    fname: string
    lname?: any
    dateofbirth: Date

}

export type Ipagination = {
    page: number
    size: number
}


export const getStudents = async (ctx: any) => {
    let reqparams: Ipagination = ctx.request.query
    try {
        await hpagination.pagination_schema.validateAsync(reqparams)
        let res = await studentservice.getStudents(reqparams)
        ctx.response.status = 200
        ctx.body = dataoutput.outputData(res.rows.length, res.rows)

    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)

    }

}

export const getStudentByStudentId = async (ctx: any) => {
    let studentid: any = ctx.params.studentid
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper id')

    } else {
        try {
            let res = await studentservice.getStudentsByStudentId(studentid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'student is not found')
                return
            }
            ctx.response.status = 200
            ctx.body = dataoutput.outputData(res.rows.length, res.rows)

        } catch (e) {
            ctx.response.status = 500
            ctx.body = messageoutput.costomError(500, e.message)
        }

    }

}

export const getStudentsByTeacherId = async (ctx: any) => {

    let teacherid: any = ctx.params.teacherid

    if (teacherid === "null" || teacherid === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper id')
    } else {
        try {
            let res = await studentservice.getStudentsByTeacherId(teacherid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'student is not found')
                return
            }
            ctx.response.status = 200
            ctx.body = dataoutput.outputData(res.rows.length, res.rows)

        } catch (e) {
            ctx.status = 500
            ctx.body = messageoutput.costomError(500, e.message)
        }

    }


}

export const getStudentsBySubName = async (ctx: any) => {


    let subjectname: any = ctx.params.subjectname

    if (subjectname === "null" || subjectname === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper id')
    } else {
        try {
            let res = await studentservice.getStudentsBySubName(subjectname)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'student not found in that subject')
                return
            }
            ctx.response.status = 200
            ctx.body = dataoutput.outputData(res.rows.length, res.rows)

        } catch (e) {
            ctx.body = messageoutput.costomError(500, e.message)
        }
    }
}

export const addStudents = async (ctx: any) => {
    let req: Istudent = ctx.request.body
    try {
        await hstudents.students_sechma.validateAsync(req)
        let res = await studentservice.addStudents(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, "student successfully added")
    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }


}
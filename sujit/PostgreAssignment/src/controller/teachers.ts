import { setPath } from "../database/clientdb"
import * as teacherservice from "../services/teachers"
import * as hteachers from "../helper/hteachers"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type Iteacher = {
    tfname: string
    tlname?: any
    tsubject_id: string
    joindate?: Date | null | undefined
}


export const getTeachers = async (ctx: any) => {
    try {
        let res = await teacherservice.getTeachers()
        ctx.body = dataoutput.outputData(res.rows.length, res.rows)
    } catch (e) {
        ctx.body = messageoutput.costomError(500, e.message)
    }

}

export const getTeacherById = async (ctx: any) => {
    let teacherid: any = ctx.params.teacherid
    if (teacherid === "null" || teacherid === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper id')

    } else {
        try {
            let res = await teacherservice.getTeacherById(teacherid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'teacher is not found')
                return
            }
            ctx.response.status = 200
            ctx.body = dataoutput.outputData(res.rows.length, res.rows)
        } catch (e) {
            ctx.body = messageoutput.costomError(500, e.message)
        }
    }
}

export const addTeachers = async (ctx: any) => {
    let req: Iteacher = ctx.request.body

    try {
        await hteachers.teachers_sechma.validateAsync(req)
        let res = await teacherservice.addTeachers(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, "teacher is successfully added")

    } catch (e) {
        ctx.body = messageoutput.costomError(500, e.message)
    }
}

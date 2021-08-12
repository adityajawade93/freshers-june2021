import { setPath } from "../database/clientdb"
import * as marksservice from "../services/marks"
import * as hmarks from "../helper/hmarks"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type IResult = {
    rstudent_id: string
    rstudent_class_id: string
    rsubject_id: string
    rmarks: number
}

export const getStudentMarksById = async (ctx: any) => {

    let studentid: any = ctx.params.studentid
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper id')

    } else {
        try {
            let res = await marksservice.getStudentMarksById(studentid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'this student marks are not given yet')
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

export const getHighestMarks = async (ctx: any) => {

    let subject_id: any = ctx.query.subject_id
    let student_class_id: any = ctx.query.student_class_id
    if (subject_id === "null" || student_class_id === "null" || subject_id === "undefined" || student_class_id === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper subject name and class')
    } else {
        try {
            let res = await marksservice.getHighestMarks(subject_id, student_class_id)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'this students marks are not given yet')
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

export const addMarks = async (ctx: any) => {
    let req: IResult = ctx.request.body

    try {
        await hmarks.marksechma.validateAsync(req)
        let res = await marksservice.addMarks(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, 'marks uploaded successfully')
    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }



}

export const topTenInClass = async (ctx: any) => {
    let student_class_id: any = ctx.params.student_class_id

    if (student_class_id === "null" || student_class_id === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, 'please give a proper standard')

    } else {
        try {
            let res = await marksservice.topTenInClass(student_class_id)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, 'the students marks are not given yet')
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
export const updateMarks = async (ctx: any) => {
    let req = ctx.request.body

    try {
        await hmarks.marksechma.validateAsync(req)
        let res = await marksservice.updateMarks(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, "marks updated successfully")
    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }
}
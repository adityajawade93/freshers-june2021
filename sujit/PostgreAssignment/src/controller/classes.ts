import { setPath } from "../database/clientdb"
import * as classservice from "../services/classes"
import * as hclasses from "../helper/hclasses"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type Iclasses = {
    cstudentid: string
    student_classid: string
}


export const getStudentsByClass = async (ctx: any) => {

    let student_classid = ctx.params.student_classid
    if (student_classid === "null" || student_classid === "undefined") {
        ctx.response.status = 400
        ctx.body = messageoutput.costomError(400, "please give a proper standard")

    } else {
        try {
            let res = await classservice.getStudentsByClass(student_classid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = messageoutput.costomMessage(404, `no students are present in the class ${student_classid}`)
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

export const addStudentsToClass = async (ctx: any) => {
    let req: Iclasses = ctx.request.body
    try {
        await hclasses.student_class_sechma.validateAsync(req)
        let res = await classservice.addStudentsToClass(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, 'added students to class successfully')
    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }
}
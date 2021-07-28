import { setPath } from "../database/clientdb"
import * as subjectservice from "../services/subject"
import * as hsubjects from "../helper/hsubjects"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type Isubject = {
    subname: string
}


export const getSubjects = async (ctx: any) => {
    try {
        let res = await subjectservice.getSubjects()
        ctx.response.status = 200
        ctx.body = dataoutput.outputData(res.rows.length, res.rows)
    } catch (e) {
        ctx.body = messageoutput.costomError(500, e.message)
    }

}

export const addSubjects = async (ctx: any) => {
    let req: Isubject = ctx.request.body
    try {
        await hsubjects.subject_sechma.validateAsync(req)
        let res = await subjectservice.addSubjects(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, "subject is successfully added")
    } catch (e) {
        ctx.body = messageoutput.costomError(500, e.message)
    }

}
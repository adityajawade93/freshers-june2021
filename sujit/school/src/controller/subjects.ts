import { setpath } from "../database/clientdb"
import * as subjectservice from "../services/subject"

type subjecttype = {
    subname: string
}


export var getsubjects = async (ctx: any) => {
    await setpath()
    var res = await subjectservice.getsubjects()
    ctx.body = JSON.stringify(res.rows, null, 2)
}

export var createsubjects = async (ctx: any) => {
    var req: subjecttype = ctx.request.body
    if (req.subname && req.subname != null && typeof req.subname == 'string') {
        await setpath()
        var res = await subjectservice.createsubjects(req.subname)
        ctx.response.status = 200
        ctx.body = "subject is successfully added"
    } else {
        ctx.response.status = 400
        ctx.body = "please give a subject name"
    }

}
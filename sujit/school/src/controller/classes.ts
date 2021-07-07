import { setpath } from "../database/clientdb"
import * as classservice from "../services/classes"

type classestype = {
    cstudentid: string
    cstandard: number
}


export var getstudentsbyclass = async (ctx: any) => {

    var std = await ctx.params.std
    if (std === "null" || std === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper standard'

    } else {
        await setpath()
        var res = await classservice.getstudentsbyclass(std)
        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = `no students are present in the class ${std}`
            return
        }
        ctx.body = JSON.stringify(res.rows, null, 2)
    }
}

export var addstudentstoclass = async (ctx: any) => {
    var req: classestype = ctx.request.body

    if (req.cstudentid && req.cstandard) {
        if (req.cstudentid != null && req.cstandard != null && typeof req.cstandard == 'number' && typeof req.cstudentid == 'string') {
            await setpath()
            var res = await classservice.addstudentstoclass(req.cstudentid, req.cstandard)
            ctx.response.status = 200
            ctx.body = 'added students to class successfully'
        } else {
            ctx.response.status = 400
            ctx.body = 'please give proper studentid and class'
        }
    } else {
        ctx.response.status = 400
        ctx.body = 'please give studentid and class'
    }


}
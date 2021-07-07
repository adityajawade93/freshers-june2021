import { query, setpath } from "../clientdb"

type sechduletype = {
    subjectname: string
    tid: string
    std: number
}

export var getsechdulebyclass = async (ctx: any) => {

    var std: any = await ctx.params.std
    if (std === "null" || std === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper standard'

    } else {
        await setpath()
        var res = await query(`select * from sechdule where std ='${std}'`)

        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = `no classes are sechduled for the class ${std}`
            return
        }

        ctx.body = JSON.stringify(res.rows, null, 2)
    }
}

export var createsechdule = async (ctx: any) => {
    var req: sechduletype = ctx.request.body
    var std, subjectname, tid
    if (req.std && req.subjectname && req.tid) {
        std = req.std
        subjectname = req.subjectname
        tid = req.tid

        if (std != null && subjectname != null && tid != null && typeof std != 'number' && typeof subjectname != 'string' && typeof tid != 'string') {
            await setpath()
            var res = await query(`insert into sechdule values('${subjectname}','${tid}','${std}')`)
            ctx.response.status = 200
            ctx.body = 'sechdule created successfully'
        } else {
            ctx.response.status = 400
            ctx.body = 'please give a proper class ,subjectname,teacherid'
        }
    } else {
        ctx.response.status = 400
        ctx.body = 'please give class ,subjectname,teacherid'

    }

}
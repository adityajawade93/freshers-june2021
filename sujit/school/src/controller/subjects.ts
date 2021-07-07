import { query, setpath } from "../clientdb"


type subjecttype = {
    subname: string
}


export var getsubjects = async (ctx: any) => {
    await setpath()
    var res = await query('select * from subjects')
    ctx.body = JSON.stringify(res.rows, null, 2)
}

export var createsubjects = async (ctx: any) => {
    var req: subjecttype = ctx.request.body
    if (req.subname && req.subname != null && typeof req.subname == 'string') {
        await setpath()
        var res = await query(`insert into subjects(subname) values ('${req.subname}')`)
        ctx.response.status = 200
        ctx.body = "subject is successfully added"
    } else {
        ctx.response.status = 400
        ctx.body = "please give a subject name"
    }

}
import { setpath } from "../database/clientdb"
import * as marksservice from "../services/marks"

type results = {
    rsid: string
    rstd: number
    rsubject: string
    rmarks: number
}


export var getstudentmarksbyid = async (ctx: any) => {

    var studentid: any = await ctx.params.studentid
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await marksservice.getstudentmarksbyid(studentid)
        if (res.rows.length == 0) {
            ctx.response.status = 400
            ctx.body = 'this student marks are not given yet'
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }
}

export var gethighestmarks = async (ctx: any) => {

    var subjectname: any = await ctx.query.subject
    var std: any = await ctx.query.std
    if (subjectname === "null" || std === "null" || subjectname === "undefined" || std === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper subject name and class'
    } else {
        await setpath()
        var res = await marksservice.gethighestmarks(subjectname, std)
        if (res.rows.length == 0) {
            ctx.response.status = 400
            ctx.body = 'this students marks are not given yet'
            return
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }

}

export var createmarks = async (ctx: any) => {
    var req: results = ctx.request.body

    if (req.rsid && req.rstd && req.rsubject && req.rmarks) {
        if (req.rsid != null && req.rstd != null && req.rsubject != null && req.rmarks != null
            && typeof req.rsid == 'string' && typeof req.rstd == 'number'
            && typeof req.rsubject == 'string' && typeof req.rmarks == 'number') {

            await setpath()
            var res = await marksservice.createmarks(req.rsid, req.rstd, req.rsubject, req.rmarks)
            ctx.response.status = 200
            ctx.body = 'marks uploaded successfully'
        } else {
            ctx.response.status = 400
            ctx.body = 'please give proper studentid,class,subject and marks'
        }
    } else {
        ctx.response.status = 400
        ctx.body = 'please give studentid,class,subject and marks'
    }

}

export var topteninclass = async (ctx: any) => {
    var std: any = await ctx.params.std

    if (std === "null" || std === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper standard'

    } else {
        await setpath()
        var res = await marksservice.topteninclass(std)
        if (res.rows.length == 0) {
            ctx.response.status = 400
            ctx.body = 'the students marks are not given yet'
            return
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }
}
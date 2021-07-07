import { setpath } from "../database/clientdb"
import * as teacherservice from "../services/teachers"

type teachertype = {
    tfname: string
    tlname?: string|null
    tsubject: string
    joindate?: Date|null|undefined
}


export var getteachers = async (ctx: any) => {
    await setpath()
    var res = await teacherservice.getteachers()
    ctx.body = JSON.stringify(res.rows, null, 2)
}

export var getteacherbyid = async (ctx: any) => {
    var teacherid: any = await ctx.params.id
    if (teacherid === "null" || teacherid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await teacherservice.getteacherbyid(teacherid)    
        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = 'teacher is not found'
            return
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }

}

export var createteachers = async (ctx: any) => {
    var req: teachertype = ctx.request.body

    var tfname, tlname, doj, tsubject
    if (req.tfname && req.tsubject) {
        if (req.tfname != null && req.tsubject != null && typeof req.tfname == 'string' && typeof req.tsubject == 'string') {
            tfname = req.tfname
            tsubject = req.tsubject
        } else {
            ctx.response.status = 400
            ctx.body = 'please give a proper firstname and subject'
            return
        }

        if (req.tlname) {
            if (req.tlname != null && typeof req.tlname == 'string') {
                tlname = req.tlname
            } else {
                ctx.response.status = 400
                ctx.body = 'please give a proper lastname'
                return
            }
        } else {
            tlname = null
        }

        if (req.joindate) {
            if (req.joindate != null && typeof req.joindate == 'string') {
                doj = req.joindate
            } else {
                ctx.response.status = 400
                ctx.body = 'please give a proper joining date'
                return
            }
        } else {
            tlname = null
        }

        await setpath()
        var res = await teacherservice.createteachers(tfname,tlname,tsubject,doj)                                               
        ctx.response.status = 200
        ctx.body = "teacher is successfully added"
    } else {
        ctx.response.status = 400
        ctx.body = 'please give firstname and subject'
    }
}

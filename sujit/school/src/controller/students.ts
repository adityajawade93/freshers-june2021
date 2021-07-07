import { setpath } from "../database/clientdb"
import * as studentservice from "../services/students"


export type studenttype = {
    fname: string
    lname?: string|null
    dateofbirth: Date

}


export var getstudents = async (ctx: any) => {
    try {
        await setpath()
        var res = await studentservice.getstudents()
        var studentsrows = await res.rows
        ctx.response.status = 200
        ctx.body = JSON.stringify(studentsrows, null, 2)
    } catch (e) {
        ctx.response.status = 400
        ctx.body = e.message

    }

}

export var getstudentbysid = async (ctx: any) => {
    var studentid: any = await ctx.params.studentid
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await studentservice.getstudentsbysid(studentid)    
        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = 'student is not found'
            return
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }

}

export var getstudentsbytid = async (ctx: any) => {

    var teacherid: any = await ctx.params.teacherid

    if (teacherid === "null" || teacherid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'
    } else {
        await setpath()
        var res = await studentservice.getstudentsbytid(teacherid)
        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = 'student is not found'
            return
        }
        ctx.response.body = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }


}

export var getstudentsbysubname = async (ctx: any) => {


    var subjectname: any = await ctx.params.subjectname

    if (subjectname === "null" || subjectname === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'
    } else {
        await setpath()
        var res = await studentservice.getstudentsbysubname(subjectname)
        if (res.rows.length == 0) {
            ctx.response.status = 404
            ctx.body = 'student with subject name not found'
            return
        }
        ctx.response.status = 200
        ctx.body = JSON.stringify(res.rows, null, 2)
    }
}

export var createstudents = async (ctx: any) => {
    var req: studenttype = ctx.request.body
    var fname, lname, dob
    if (req.fname && req.dateofbirth) {
        if (req.fname != null && req.dateofbirth != null && typeof req.fname == 'string' && typeof req.dateofbirth == 'string') {
            fname = req.fname
            dob = req.dateofbirth
        } else {
            ctx.response.status = 400
            ctx.body = 'please give a proper firstname and date of birth'
            return
        }

        if (req.lname) {
            if (req.lname != null && typeof req.lname == 'string') {
                lname = req.lname
            } else {
                ctx.response.status = 400
                ctx.body = 'please give a proper lastname'
                return
            }
        } else {
            lname = null
        }
        await setpath()
        var res  = await studentservice.createstudents(fname,lname,dob) 
        ctx.body = "student successfully added"
    } else {

        ctx.response.status = 400
        ctx.body = 'please give firstname and date of birth'
        return

    }


}
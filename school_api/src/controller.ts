import { query, setpath } from "./clientdb"
import { v4 as uuid } from 'uuid'
import { type } from "os"


type studenttype = {
    fname: string
    lname?: string
    dateofbirth: Date

}

type teachertype = {
    tfname: string
    tlname?: string
    tsubject: string
    joindate?: Date
}

type subjecttype = {
    subname: string
}

type sechduletype = {
    subjectname: string
    tid: string
    std: number
}

type classestype = {
    cstudentid: string
    cstandard: number
}

type results = {
    rsid: string
    rstd: number
    rsubject: string
    rmarks: number
}


export var getstudents = async (ctx: any) => {
    await setpath()
    var res = await query('select * from students')
    var studentsrows = await res.rows
    ctx.response.status = 200
    ctx.body = JSON.stringify(studentsrows, null, 2)

}

export var getstudentbysid = async (ctx: any) => {
    var studentid: any = await ctx.params.studentid
    //console.log(studentid.substr(0,studentid.length-1))
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await query(`select * from students` +
            ` where studentid = '${studentid}'`)
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
        var res = await query(`select S.* 
                               from students as S ,sechdule as E
                               where E.tid ='${teacherid}' and std = (select std from sechdule 
                                                                         where tid ='${teacherid}')`)
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
        var res = await query(`select students.*
                                from students ,sechdule
                                where sechdule.subjectname = '${subjectname}' and std =(select std from sechdule
                                                                                        where subjectname ='${subjectname}')`)
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
        var res = await query(`insert into students(fname,lname,bdate) values('${fname}','${lname}','${dob}')`)
        ctx.body = "student successfully added"
    } else {

        ctx.response.status = 400
        ctx.body = 'please give firstname and date of birth'
        return

    }


}

export var getteachers = async (ctx: any) => {
    await setpath()
    var res = await query('select * from teachers')
    ctx.body = JSON.stringify(res.rows, null, 2)
}

export var getteacherbyid = async (ctx: any) => {
    var teacherid: any = await ctx.params.id
    //console.log(studentid.substr(0,studentid.length-1))
    if (teacherid === "null" || teacherid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await query(`select * from teachers` +
            ` where teacherid = '${teacherid}'`)
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
        var res = await query(`insert into teachers(tfname,tlname,tsubject,joindate) 
                                                       values('${tfname}','${tlname}','${tsubject}','${doj}')`)
        ctx.response.status = 200
        ctx.body = "teacher is successfully added"
    } else {
        ctx.response.status = 400
        ctx.body = 'please give firstname and subject'
    }
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

export var getstudentsbyclass = async (ctx: any) => {

    var std = await ctx.params.std
    if (std === "null" || std === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper standard'

    } else {
        await setpath()
        var res = await query(`select * from classes where cstandard ='${std}'`)
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
            var res = await query(`insert into classes values('${req.cstudentid}','${req.cstandard}')`)
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

export var getstudentmarksbyid = async (ctx: any) => {

    var studentid: any = await ctx.params.studentid
    if (studentid === "null" || studentid === "undefined") {
        ctx.response.status = 400
        ctx.body = 'please give a proper id'

    } else {
        await setpath()
        var res = await query(`select R.*,S.fname
                                from results as R ,students as S 
                                where R.rsid ='${studentid}'and S.studentid ='${studentid}'`)
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
        var res = await query(`select * from students
                               where studentid = (select rsid from results
                                               where rstd ='${std}' and rsubject ='${subjectname}' and rmarks =(select max(rmarks) from results 
                                                                         where rstd = '${std}' and rsubject ='${subjectname}'))`)

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
            var res = await query(`insert into results values('${req.rsid}','${req.rstd}','${req.rsubject}','${req.rmarks}')`)
            ctx.response.status =200
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

/*module.exports = {
    getstudents,
    getstudentbysid,
    getstudentsbytid,
    getstudentsbysubname,
    createstudents,
    getteachers,
    getteacherbyid,
    createteachers,
    getsubjects,
    createsubjects,
    getsechdulebyclass,
    createsechdule,
    getstudentsbyclass,
    addstudentstoclass,
    getstudentmarksbyid,
    gethighestmarks,
    createmarks
}*/
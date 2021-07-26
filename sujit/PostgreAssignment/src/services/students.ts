import { query } from "../database/clientdb"
import { Ipagination, Istudent } from "../controller/students"

export const getStudents = async (reqparams: Ipagination) => {
    let limit = reqparams.size
    let offset = reqparams.size * reqparams.page
    try {
        let result = await query(`select * from students offset ${offset} limit ${limit}`)
        return result
    } catch (e) {
        throw new Error(e)
    }

}

export const getStudentsByStudentId = async (studentid: any) => {

    try {
        let result = await query(`select * from students
                             where studentid = '${studentid}'`)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export const getStudentsByTeacherId = async (teacherid: any) => {

    try {
        let result = await query(`select students.* from students
        inner join student_class
        on student_class.cstudentid = students.studentid
        inner join sechdule
        on sechdule.classid = student_class.student_classid
        where sechdule.teacher_id ='${teacherid}'
        order by students.fname`)
        return result
    } catch (e) {
        throw new Error(e)
    }


}

export const getStudentsBySubName = async (subjectname: any) => {


    try {
        let result = await query(`select students.*
        from students 
        inner join student_class
        on student_class.cstudentid =students.studentid
        inner join sechdule
        on sechdule.classid = student_class.student_classid
        where sechdule.subjectname = '${subjectname}'
        order by students.fname`)
        return result
    } catch (e) {
        throw new Error(e)
    }
}

export const addStudents = async (req: Istudent) => {

    try {
        let result = await query(`insert into students(fname,lname,bdate) values('${req.fname}','${req.lname}','${req.dateofbirth}')`)
        return result
    } catch (e) {
        throw new Error(e)
    }

}
import { Iclasses } from "../controller/classes"
import { query } from "../database/clientdb"


export const getStudentsByClass = async (student_classid: any) => {

    try {
        let res = await query(`select * from student_class where student_classid ='${student_classid}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}

export const addStudentsToClass = async (req:Iclasses) => {

    try {
        let res = await query(`insert into student_class values('${req.cstudentid}','${req.student_classid}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }



}
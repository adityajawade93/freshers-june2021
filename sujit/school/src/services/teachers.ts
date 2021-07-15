import { Iteacher } from "../controller/teachers"
import { query } from "../database/clientdb"


export const getTeachers = async () => {
    try {
        let res = await query('select * from teachers')
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export const getTeacherById = async (teacherid: any) => {

    try {
        let res = await query(`select * from teachers
            where teacherid = '${teacherid}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export const addTeachers = async (req:Iteacher) => {
    try {
        let res = await query(`insert into teachers(tfname,tlname,tsubject,joindate) 
                                                       values('${req.tfname}','${req.tlname}','${req.tsubject_id}','${req.joindate}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}
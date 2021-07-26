import { Isubject } from "../controller/subjects"
import { query } from "../database/clientdb"


export const getSubjects =  async () => {
    try {
        let res = await query('select * from subjects order by subjectid desc')
        return res
    } catch (e) {
        throw new Error(e)
    }
}

export const addSubjects =  async (req:Isubject) => {

    try {
        let res = await query(`insert into subjects(subname) values ('${req.subname}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }
}
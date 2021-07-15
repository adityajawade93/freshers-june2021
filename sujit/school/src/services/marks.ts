import { query} from "../database/clientdb"
import { IResult } from "../controller/marks"


export const getStudentMarksById = async (studentid: string) => {

    try {
        let res = await query(`select R.*,S.fname
                                from results as R ,students as S 
                                where R.rstudent_id ='${studentid}'and S.studentid ='${studentid}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}

export const getHighestMarks = async (rsubject_id: string, rstudent_class_id: string) => {

    try {
        let res = await query(`select students. * ,results.rmarks from students
        inner join results
        on students.studentid = results.rstudent_id
        where results.rsubject_id = '${rsubject_id}' and results.rstudent_class_id ='${rstudent_class_id}'
        order by results.rmarks desc
        limit 1`)
        return res
    } catch (e) {
        throw new Error(e)
    }




}

export const addMarks = async (req:IResult) => {

    try {
        let res = await query(`insert into results values('${req.rstudent_id}','${req.rstudent_class_id}','${req.rsubject_id}','${req.rmarks}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}

export const topTenInClass = async (rstudent_class_id:string) => {

    try {
        let res = await query(`select studentid,rstudent_class_id,fname,sum(rmarks)
                               from students
                               inner join results
                               on studentid = rstudent_id
                               where rstudent_class_id='${rstudent_class_id}'
                               group by studentid,rstudent_class_id
                               order by sum desc
                               limit 10`)
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export const updateMarks = async (req:IResult) =>{

    try {
        let res = await query(`update results
        set rmarks = ${req.rmarks}
        where rstudent_id = '${req.rstudent_id}' and rstudent_class_id = '${req.rstudent_class_id}'
        and rsubject_id = '${req.rsubject_id}'`)

        return res
    } catch (e) {
        throw new Error(e)
    }
}
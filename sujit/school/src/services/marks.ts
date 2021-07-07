import { query} from "../database/clientdb"



export var getstudentmarksbyid = async (studentid: string) => {

    try {
        var res = await query(`select R.*,S.fname
                                from results as R ,students as S 
                                where R.rsid ='${studentid}'and S.studentid ='${studentid}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export var gethighestmarks = async (subjectname: string, std: number) => {

    try {
        var res = await query(`select students. * ,results.rmarks from students
        inner join results
        on students.studentid = results.rsid
        where results.rsubject = '${subjectname}' and results.rstd ='${std}'
        order by results.rmarks desc
        limit 1`)
        return res
    } catch (e) {
        throw new Error(e)
    }




}

export var createmarks = async (rsid:string, rstd:number, rsubject:string, rmarks:number) => {

    try {
        var res = await query(`insert into results values('${rsid}','${rstd}','${rsubject}','${rmarks}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}

export var topteninclass = async (std:number) => {

    try {
        var res = await query(`select studentid,rstd,fname,sum(rmarks)
                               from students
                               inner join results
                               on studentid = rsid
                               where rstd='${std}'
                               group by studentid,rstd
                               order by sum desc
                               limit 10`)
        return res
    } catch (e) {
        throw new Error(e)
    }


}
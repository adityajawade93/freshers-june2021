import { query } from "../database/clientdb"


export var getstudentsbyclass = async (std: any) => {

    try {
        var res = query(`select * from classes where cstandard ='${std}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}

export var addstudentstoclass = async (cstudentid: string, cstandard: number) => {

    try {
        var res = await query(`insert into classes values('${cstudentid}','${cstandard}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }



}
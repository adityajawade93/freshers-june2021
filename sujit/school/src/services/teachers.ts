import { query } from "../database/clientdb"


export var getteachers = () => {
    try {
        var res = query('select * from teachers')
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export var getteacherbyid = (teacherid: any) => {

    try {
        var res = query(`select * from teachers
            where teacherid = '${teacherid}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }


}

export var createteachers = async (tfname: string, tlname: string | null, tsubject: string, doj: Date | null | undefined) => {
    try {
        var res = await query(`insert into teachers(tfname,tlname,tsubject,joindate) 
                                                       values('${tfname}','${tlname}','${tsubject}','${doj}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }

}
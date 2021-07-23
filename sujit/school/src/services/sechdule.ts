import { Isechdule } from "../controller/sechdule"
import { query } from "../database/clientdb"



export const getSechduleByClass = async (classid: any) => {

    try {
        let res = await query(`select * from sechdule where classid ='${classid}' order by teacher_id`)
        return res
    } catch (e) {
        throw new Error(e)
    }
    
}

export var addSechdule = async (req:Isechdule) => {

    try {
        var res = await query(`insert into sechdule values('${req.subjectname}','${req.teacher_id}','${req.classid}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }
    
}
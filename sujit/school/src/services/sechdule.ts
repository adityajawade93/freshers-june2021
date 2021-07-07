import { query } from "../database/clientdb"



export var getsechdulebyclass = (std: any) => {

    try {
        var res = query(`select * from sechdule where std ='${std}'`)
        return res
    } catch (e) {
        throw new Error(e)
    }
    
}

export var createsechdule = async (subjectname:string,tid:string,std:number) => {

    try {
        var res = await query(`insert into sechdule values('${subjectname}','${tid}','${std}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }
    
}
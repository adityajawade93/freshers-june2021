import { query } from "../database/clientdb"


export var getsubjects =  () => {
    try {
        var res = query('select * from subjects')
        return res
    } catch (e) {
        throw new Error(e)
    }
}

export var createsubjects =  (subname:any) => {

    try {
        var res = query(`insert into subjects(subname) values ('${subname}')`)
        return res
    } catch (e) {
        throw new Error(e)
    }
}
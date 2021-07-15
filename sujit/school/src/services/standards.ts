import { Istandard } from "../controller/standards"
import { query } from "../database/clientdb"


export const getStandard = async () =>{
    try {
        let res = await query("select * from standards")
        return res
    } catch (e) {
        throw new Error(e)
    }
}

export const addStandard = async (req:Istandard) =>{
    try {
        let res = await query(`insert into standards(class_level) values(${req.class_level})`)
        return res
    } catch (e) {
        throw new Error(e)
    }
}
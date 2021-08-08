import { setPath } from "../database/clientdb"
import * as standardservice from "../services/standards"
import * as hstandard from "../helper/hstandard"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type Istandard = {
    class_level: number
}

export const getstandard = async (ctx: any) => {
    try {
        let res = await standardservice.getStandard()
        ctx.body = dataoutput.outputData(res.rows.length, res.rows)
    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }

}

export const addStandard = async (ctx: any) => {
    let req: Istandard = ctx.request.body

    try {
        await hstandard.standard_schema.validateAsync(req)
        let res = await standardservice.addStandard(req)
        ctx.response.status = 200
        ctx.body = messageoutput.costomMessage(200, "class is successfully added")

    } catch (e) {
        ctx.response.status = 500
        ctx.body = messageoutput.costomError(500, e.message)
    }
}
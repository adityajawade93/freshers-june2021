import { setpath } from "../database/clientdb"
import * as sechduleservice from "../services/sechdule"
import * as hsechdule from "../helper/hsechdule"
import * as dataoutput from "../customoutput/dataoutput"
import * as messageoutput from "../customoutput/messageoutput"

export type Isechdule = {
    subjectname: string
    teacher_id: string
    classid: string
}

export const getSechduleByClass = async (ctx: any) => {

    let classid: any = ctx.params.classid
    if (classid === "null" || classid === "undefined") {
        ctx.response.status = 400
        ctx.body = await messageoutput.costomerror(400, 'please give a proper standard')

    } else {
        try {
            await setpath()
            let res = await sechduleservice.getSechduleByClass(classid)
            if (res.rows.length == 0) {
                ctx.response.status = 404
                ctx.body = await messageoutput.costommessage(404, `no classes are sechduled for the class ${classid}`)
                return
            }
            ctx.response.status = 200
            ctx.body = await dataoutput.outputdata(res.rows.length, res.rows)
        } catch (e) {
            ctx.body = await messageoutput.costomerror(406, e.message)
        }
    }
}

export const addSechdule = async (ctx: any) => {
    let req: Isechdule = ctx.request.body
    try {
        await hsechdule.sechdule_sechma.validateAsync(req)
        await setpath()
        let res = await sechduleservice.addSechdule(req)
        ctx.response.status = 200
        ctx.body = await messageoutput.costommessage(200,'sechdule created successfully')
        
    } catch (e) {
        ctx.body = await messageoutput.costomerror(406,e.message)
    }

}
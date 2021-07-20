import { Context } from "vm";

import * as servicegeneral from "../services/general";
const validation = require('../helpers/validation_schema.ts');

interface topper {
  roll_num: number;
  fname: string;
  marks: number;
}

export async function gettopperByclassIdAndSubjectId(ctx: Context) {
  
    var c_id = parseInt(ctx.params.c_id);
    var s_id = parseInt(ctx.params.s_id);
    const reqBody = await validation.generalSchema.validate(c_id,s_id);
    if(reqBody.error)
    {
      ctx.response.status = 422;
      ctx.response.type = "text/html";
      ctx.body="Please enter valid details";
      return ;

    }; 
    try {
    let [rows]: Array<{ rows: topper }> = [];
    rows = await servicegeneral.get_topper_by_classid_and_subjectid(c_id, s_id);

    ctx.response.status = 200;
    ctx.response.type = "application/json";
    ctx.body = rows.rows;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.type = "text/html";
    ctx.body = "Server error";
    return;
  }
}

import { client as sqlclient } from "../database/db";

export async function get_topper_by_classid_and_subjectid(
  c_id: number,
  s_id: number
) {
  try {
    
    return await sqlclient.query(`SELECT ST.roll_num,ST.fname,S.marks FROM (SELECT * FROM Marks WHERE standard=${c_id} AND subcode=${s_id} ORDER BY marks DESC) 
          AS S,Students AS ST WHERE S.roll_num=ST.roll_num LIMIT 1`);
  } catch (e) {
    throw Error(e);
  }
}

import { client as sqlclient } from "../database/db";

export async function add_marks(
  resultsid: number,
  roll_num: number,
  subcode: number,
  staffid: number,
  standard: number,
  marks: number
) {
  try {
    
    const data = [resultsid, roll_num, subcode, staffid, standard, marks];
    return await sqlclient.query(
      "INSERT INTO Marks values($1,$2,$3,$4,$5,$6)",
      data
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function update_result(
  roll_num: number,
  subcode: number,
  marks: number
) {
  try {
    
    return await sqlclient.query(
      `Update Marks SET marks=${marks} WHERE roll_num=${roll_num} AND subcode=${subcode}`
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function check_subject(roll_num: number) {
  try {
   
    return await sqlclient.query(
      `SELECT S.subcode FROM Students AS S,Standards AS st WHERE S.roll_num=${roll_num} AND S.standard=st.standard`
    );
  } catch (e) {
    throw Error(e);
  }
}

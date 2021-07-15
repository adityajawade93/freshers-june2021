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
    await sqlclient.query("SET search_path TO school");
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
    await sqlclient.query("SET search_path TO school");
    return await sqlclient.query(
      `Update Marks SET marks=${marks} WHERE roll_num=${roll_num} AND subcode=${subcode}`
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function check_subject(roll_num: number) {
  try {
    await sqlclient.query("SET search_path TO school");
    return await sqlclient.query(
      `SELECT cs.subcode FROM Class_schedule AS cs,Standards AS s WHERE cs.roll_num=${roll_num} AND cs.Standard=s.standard`
    );
  } catch (e) {
    throw Error(e);
  }
}

export async function subject_length(roll_num: number) {
  try {
    await sqlclient.query("SET search_path TO school");
    return await sqlclient.query(
      `SELECT COUNT(*) FROM (SELECT cs.subcode FROM Class_schedule AS cs,Standards AS s WHERE cs.roll_num=${roll_num} AND cs.Standard=s.standard) AS S`
    );
  } catch (e) {
    throw Error(e);
  }
}

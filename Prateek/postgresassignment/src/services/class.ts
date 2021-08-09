import { client as sqlclient } from "../database/db";

export async function get_class() {
  try {
    return await sqlclient.query("SELECT * FROM Class_schedule");
  } catch (e) {
    throw Error(e);
  }
}

export async function get_student_by_standard(standard: number) {
  try {

    return await sqlclient.query(
      `SELECT S.roll_num,S.fname,S.lname,S.standard FROM Students AS S WHERE S.standard=${standard}`
    );
  } catch (e) {
    throw Error(e);
  }
}

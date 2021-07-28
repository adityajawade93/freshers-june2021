import { client as sqlclient } from "../database/db";

export async function get_teacher() {
  try {

    return await sqlclient.query("SELECT * FROM Teachers");
  } catch (e) {
    throw Error(e);
  }
}

export async function get_student_by_staffid(staffid: number) {
  try {
    return await sqlclient.query(`SELECT st.roll_num ,st.fname,st.lname,st.standard 
                  FROM Students AS st INNER JOIN Teachers AS t ON t.subcode=st.subcode AND t.staffid=${staffid}`);
  } catch (e) {
    throw Error(e);
  }
}

export async function add_teacher(
  staffid: number,
  fname: string,
  lname: string,
  subcode: number
) {
  try {
    
    const data = [staffid, fname, lname, subcode];
    return await sqlclient.query(
      "INSERT INTO Teachers values($1,$2,$3,$4)",
      data
    );
  } catch (e) {
    throw Error(e);
  }
}

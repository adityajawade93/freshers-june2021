import { client as sqlclient } from "../database/db";

export async function get_subject() {
  try {
    await sqlclient.query("SET search_path TO school");
    return await sqlclient.query("SELECT * FROM Subjects");
  } catch (e) {
    throw Error(e);
  }
}

export async function get_student_by_subjectid(subcode: number) {
  try {
   
    return await sqlclient.query(`SELECT st.roll_num,st.fname,st.lname,st.standard
            FROM Students AS st,Subjects AS sub WHERE sub.subcode=${subcode} AND sub.subcode=st.subcode`);
  } catch (e) {
    throw Error(e);
  }
}

export async function add_subject(
  subcode: number,
  subject: string,
  staffid: number
) {
  try {
    
    const data = [subcode, subject, staffid];
    return await sqlclient.query("INSERT INTO Subjects values($1,$2,$3)", data);
  } catch (e) {
    throw Error(e);
  }
}

export async function get_subjectmarks_by_studentid(id: number) {
  try {
    
    return await sqlclient.query(
      `SELECT m.subcode,sub.subject,m.marks FROM Marks AS m,Subjects AS sub WHERE m.roll_num=${id} AND sub.subcode=m.subcode`
    );
  } catch (e) {
    throw Error(e);
  }
}

import { query } from '../database/index';

export async function getSubject() {
  try {
    const response = await query(`select * from school.subject`);
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function studentOfSubject(subjectId: string) {
  try {
    const respose = await query(
      `select * 
            from school.student as st, school.subject as sb
            where st.classid = sb.classid and sb.subjectid = '${subjectId}'`
    );
    return respose.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function addSubject(
  name: string,
  classid: string,
  teacherid: string
) {
  try {
    const response = await query(`INSERT INTO school.subject(name, classid, teacherid) VALUES
        ('${name}','${classid}','${teacherid}') RETURNING subjectid`);
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

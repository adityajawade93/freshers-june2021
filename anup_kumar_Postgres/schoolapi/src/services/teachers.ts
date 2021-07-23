import { query } from '../database/index';

export async function allteacher() {
  try {
    return await query('select * from school.teacher');
  } catch (e) {
    throw Error(e);
  }
}

export async function studentOfteacher(teacherId: string) {
  try {
    const response = await query(
      `select * 
          from school.student as st, school.subject as sb
          where st.classid = sb.classid and sb.teacherid =  '${teacherId}'`
    );
    return response.rows;
  } catch (e) {
    throw Error(e);
  }
}

export async function addTeacher(name: string, sex: string, phone: string) {
  try {
    const response = await query(
      `INSERT INTO school.teacher(name,sex,phone) VALUES ('${name}','${sex}','${phone}') RETURNING teacherid`
    );

    return response.rows[0];
  } catch (e) {
    throw Error(e);
  }
}

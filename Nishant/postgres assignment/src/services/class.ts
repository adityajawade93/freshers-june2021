import sqlclient from '../database/db';

export async function getClass() {
  try {
    return (await sqlclient.query('SELECT * FROM College.Class_schedule ORDER BY classno'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentByClassId(classId:number) {
  try {
    return (await sqlclient.query(`SELECT S.student_id,S.fname FROM College.Student AS S,College.class_student WHERE class_id=${classId} AND studid=student_id ORDER BY S.fname`));
  } catch (e) {
    throw Error(e);
  }
}

export async function addStudentInClass(classId:number, studId:number) {
  try {
    const data = [classId, studId];
    return (await sqlclient.query('INSERT INTO College.class_student values($1,$2)', data));
  } catch (e) {
    throw Error(e);
  }
}

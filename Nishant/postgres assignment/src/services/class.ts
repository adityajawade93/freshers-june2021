import sqlclient from '../database/db';

export async function getClass() {
  const response = (await sqlclient.query('SELECT * FROM College.Class_schedule ORDER BY classno'));
  return response;
}

export async function getStudentByClassId(classId:number) {
  const response = (await sqlclient.query(`SELECT S.student_id,S.fname FROM College.Student AS S,College.class_student WHERE class_id=${classId} AND studid=student_id ORDER BY S.fname`));
  return response;
}

export async function addStudentInClass(classId:number, studId:number) {
  const data = [classId, studId];
  const response = (await sqlclient.query('INSERT INTO College.class_student values($1,$2)', data));
  return response;
}

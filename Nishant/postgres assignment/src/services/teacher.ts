import sqlclient from '../database/db';

export async function getTeacher() {
  const response = (await sqlclient.query('SELECT * FROM College.Teacher ORDER BY fname'));
  return response;
}

export async function getStudentByTeacherId(teacherId:number) {
  const response = (await sqlclient.query(`SELECT S.student_id,S.fname FROM College.Student AS S,College.class_student,College.class_schedule WHERE t_id=${teacherId} AND class_id=classid AND studid=student_id ORDER BY S.fname`));
  return response;
}

export async function addTeacher(teacherId:number, fname:string, mname:string,
  lname:string, dob:Date, gender:string, address:string) {
  const data = [teacherId, fname, mname, lname, dob, gender, address];
  const response = (await sqlclient.query('INSERT INTO College.Teacher values($1,$2,$3,$4,$5,$6,$7)', data));
  return response;
}

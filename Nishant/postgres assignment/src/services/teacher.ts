import sqlclient from '../database/db';

export async function getTeacherService() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT * FROM Teacher ORDER BY fname'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentByTeacherIdService(teacherId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=${teacherId} AND class_id=classid AND studid=student_id ORDER BY S.fname`));
  } catch (e) {
    throw Error(e);
  }
}

export async function addTeacherService(teacherId:number, fname:string, mname:string,
  lname:string, dob:Date, gender:string, address:string) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [teacherId, fname, mname, lname, dob, gender, address];
    return (await sqlclient.query('INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)', data));
  } catch (e) {
    throw Error(e);
  }
}

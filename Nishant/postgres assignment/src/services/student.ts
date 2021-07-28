import sqlclient from '../database/db';

export async function getStudent() {
  const response = (await sqlclient.query('SELECT * FROM College.Student ORDER BY fname'));
  return response;
}

export async function getStudentLength() {
  const response = (await sqlclient.query('SELECT Count(*) FROM College.Student'));
  return response;
}

export async function addStudent(studentId:number, fname:string, mname:string,
  lname:string, dob:Date, gender:string, address:string) {
  const data = [studentId, fname, mname, lname, dob, gender, address];
  const response = (await sqlclient.query('INSERT INTO College.Student values($1,$2,$3,$4,$5,$6,$7)', data));
  return response;
}

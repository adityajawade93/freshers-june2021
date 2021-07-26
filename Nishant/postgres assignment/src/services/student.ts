import sqlclient from '../database/db';

export async function getStudent() {
  try {
    return (await sqlclient.query('SELECT * FROM College.Student ORDER BY fname'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentLength() {
  try {
    return (await sqlclient.query('SELECT Count(*) FROM College.Student'));
  } catch (e) {
    throw Error(e);
  }
}

export async function addStudent(studentId:number, fname:string, mname:string,
  lname:string, dob:Date, gender:string, address:string) {
  try {
    const data = [studentId, fname, mname, lname, dob, gender, address];
    return (await sqlclient.query('INSERT INTO College.Student values($1,$2,$3,$4,$5,$6,$7)', data));
  } catch (e) {
    throw Error(e);
  }
}

import sqlclient from '../database/db';

export async function getClassService() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT * FROM Class_schedule'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentByClassIdService(classId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student WHERE class_id=${classId} AND studid=student_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function addStudentInClassService(classId:number, studId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [classId, studId];
    return (await sqlclient.query('INSERT INTO class_student values($1,$2)', data));
  } catch (e) {
    throw Error(e);
  }
}

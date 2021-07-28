import sqlclient from '../database/db';

export async function getSubject() {
  const response = (await sqlclient.query('SELECT * FROM College.subject ORDER BY subject_name'));
  return response;
}

export async function getStudentBySubjectId(subjectId:number) {
  const response = (await sqlclient.query(`SELECT S.student_id,S.fname FROM College.Student AS S,College.class_student,College.class_schedule WHERE subj_id=${subjectId} AND class_id=classid AND studid=student_id ORDER BY S.fname`));
  return response;
}

export async function addSubject(subjectId:number, subjectName:string) {
  const data = [subjectId, subjectName];
  const response = (await sqlclient.query('INSERT INTO College.Subject values($1,$2)', data));
  return response;
}

export async function getSubjectMarksByStudentId(studentId:number) {
  const response = (await sqlclient.query(`SELECT subject_id,subject_name,marks FROM College.result,College.subject WHERE studentid=${studentId} AND subjectid=subject_id ORDER BY subject_name`));
  return response;
}

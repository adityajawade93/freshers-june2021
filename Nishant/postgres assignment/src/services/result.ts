import sqlclient from '../database/db';

export async function addResult(resultId:number, studentId:number, clasId:number,
  subjectId:number, marks:number) {
  const data = [resultId, studentId, clasId, subjectId, marks];
  const response = (await sqlclient.query('INSERT INTO College.result values($1,$2,$3,$4,$5)', data));
  return response;
}

export async function updateResult(studentId:number, subjectId:number, marks:number) {
  const response = (await sqlclient.query(`Update College.result SET marks=${marks} WHERE studentid=${studentId} AND subjectid=${subjectId}`));
  return response;
}

export async function checkSubject(studentId:number) {
  const response = (await sqlclient.query(`SELECT subj_id FROM College.class_schedule,College.class_student WHERE studid=${studentId} AND classid=class_id`));
  return response;
}

export async function subjectLength(studentId:number) {
  const response = (await sqlclient.query(`SELECT COUNT(*) FROM (SELECT subj_id FROM College.class_schedule,College.class_student WHERE studid=${studentId} AND classid=class_id) AS S`));
  return response;
}

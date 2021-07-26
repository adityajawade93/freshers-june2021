import sqlclient from '../database/db';

export async function addResult(resultId:number, studentId:number, clasId:number,
  subjectId:number, marks:number) {
  try {
    const data = [resultId, studentId, clasId, subjectId, marks];
    return (await sqlclient.query('INSERT INTO College.result values($1,$2,$3,$4,$5)', data));
  } catch (e) {
    throw Error(e);
  }
}

export async function updateResult(studentId:number, subjectId:number, marks:number) {
  try {
    return (await sqlclient.query(`Update College.result SET marks=${marks} WHERE studentid=${studentId} AND subjectid=${subjectId}`));
  } catch (e) {
    throw Error(e);
  }
}

export async function checkSubject(studentId:number) {
  try {
    return (await sqlclient.query(`SELECT subj_id FROM College.class_schedule,College.class_student WHERE studid=${studentId} AND classid=class_id ORDER BY subj_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function subjectLength(studentId:number) {
  try {
    return (await sqlclient.query(`SELECT COUNT(*) FROM (SELECT subj_id FROM College.class_schedule,College.class_student WHERE studid=${studentId} AND classid=class_id) AS S`));
  } catch (e) {
    throw Error(e);
  }
}

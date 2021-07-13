/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import { client as sqlclient } from '../database/db';

export async function add_result(result_id:number, studentid:number, clas_id:number,
  subjectid:number, marks:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [result_id, studentid, clas_id, subjectid, marks];
    return (await sqlclient.query('INSERT INTO result values($1,$2,$3,$4,$5)', data));
  } catch (e) {
    throw Error(e);
  }
}

export async function update_result(studentid:number, subjectid:number, marks:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`Update result SET marks=${marks} WHERE studentid=${studentid} AND subjectid=${subjectid}`));
  } catch (e) {
    throw Error(e);
  }
}

export async function check_subject(studentid:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT subj_id FROM class_schedule,class_student WHERE studid=${studentid} AND classid=class_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function subject_length(studentid:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT COUNT(*) FROM (SELECT subj_id FROM class_schedule,class_student WHERE studid=${studentid} AND classid=class_id) AS S`));
  } catch (e) {
    throw Error(e);
  }
}

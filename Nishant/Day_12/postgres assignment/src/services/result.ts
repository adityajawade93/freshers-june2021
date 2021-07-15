/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { client as sqlclient } from '../database/db';

export async function addResultService(resultId:number, studentId:number, clasId:number,
  subjectId:number, marks:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [resultId, studentId, clasId, subjectId, marks];
    return (await sqlclient.query('INSERT INTO result values($1,$2,$3,$4,$5)', data));
  } catch (e) {
    throw Error(e);
  }
}

export async function updateResultService(studentId:number, subjectId:number, marks:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`Update result SET marks=${marks} WHERE studentid=${studentId} AND subjectid=${subjectId}`));
  } catch (e) {
    throw Error(e);
  }
}

export async function checkSubject(studentId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT subj_id FROM class_schedule,class_student WHERE studid=${studentId} AND classid=class_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function subjectLength(studentId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT COUNT(*) FROM (SELECT subj_id FROM class_schedule,class_student WHERE studid=${studentId} AND classid=class_id) AS S`));
  } catch (e) {
    throw Error(e);
  }
}

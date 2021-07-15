/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { client as sqlclient } from '../database/db';

export async function getSubjectService() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT * FROM subject'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentBySubjectIdService(subjectId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=${subjectId} AND class_id=classid AND studid=student_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function addSubjectService(subjectId:number, subjectName:string) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [subjectId, subjectName];
    return (await sqlclient.query('INSERT INTO Subject values($1,$2)', data));
  } catch (e) {
    throw Error(e);
  }
}

export async function getSubjectMarksByStudentIdService(studentId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=${studentId} AND subjectid=subject_id`));
  } catch (e) {
    throw Error(e);
  }
}

/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { client as sqlclient } from '../database/db';

export async function get_teacher() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT * FROM Teacher'));
  } catch (e) {
    throw Error(e);
  }
}

export async function get_student_by_teacherid(teacherId:number) {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=${teacherId} AND class_id=classid AND studid=student_id`));
  } catch (e) {
    throw Error(e);
  }
}

export async function add_teacher(teacher_id:number, fname:string, mname:string,
  lname:string, dob:string, gender:string, address:string) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [teacher_id, fname, mname, lname, dob, gender, address];
    return (await sqlclient.query('INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)', data));
  } catch (e) {
    throw Error(e);
  }
}

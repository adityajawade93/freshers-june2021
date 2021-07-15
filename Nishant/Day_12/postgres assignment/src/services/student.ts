/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { client as sqlclient } from '../database/db';

export async function getStudentService() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT * FROM Student'));
  } catch (e) {
    throw Error(e);
  }
}

export async function getStudentLengthService() {
  try {
    await sqlclient.query('SET search_path TO College');
    return (await sqlclient.query('SELECT Count(*) FROM Student'));
  } catch (e) {
    throw Error(e);
  }
}

export async function addStudentService(studentId:number, fname:string, mname:string,
  lname:string, dob:string, gender:string, address:string) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [studentId, fname, mname, lname, dob, gender, address];
    return (await sqlclient.query('INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)', data));
  } catch (e) {
    throw Error(e);
  }
}

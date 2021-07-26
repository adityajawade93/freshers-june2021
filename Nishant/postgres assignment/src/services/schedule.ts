import sqlclient from '../database/db';

export default async function addClassSchedule(classId:number, classNo:number, subjId:number,
  subjName:string, tId:number, tFname:string) {
  try {
    const data = [classId, classNo, subjId, subjName, tId, tFname];
    return (await sqlclient.query('INSERT INTO College.Class_schedule values($1,$2,$3,$4,$5,$6)', data));
  } catch (e) {
    throw Error(e);
  }
}

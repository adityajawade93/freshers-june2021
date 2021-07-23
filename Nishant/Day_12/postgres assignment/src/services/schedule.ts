import sqlclient from '../database/db';

export default async function addClassScheduleService(classId:number, classNo:number, subjId:number,
  subjName:string, tId:number, tFname:string) {
  try {
    await sqlclient.query('SET search_path TO College');
    const data = [classId, classNo, subjId, subjName, tId, tFname];
    return (await sqlclient.query('INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)', data));
  } catch (e) {
    throw Error(e);
  }
}

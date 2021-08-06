
import { client } from "../Database/Client";

export const insertStudentInfo = async (studentInfo: any) => {

    return (await client.query("INSERT INTO school.student VALUES ($1,$2,$3,$4);", studentInfo)).rows;;
}

export const getStudentInfo= async (): Promise<any> => {
    return (await client.query("SELECT * FROM school.student ORDER BY sid")).rows;

}

export const getStudentNumber = async(): Promise<any> =>{
    return (await client.query("SELECT COUNT(*) FROM school.student")).rows; 
}

export const getStudentInfobyStudentId = async (studentId: string): Promise<any> => {

    return (await client.query("SELECT * FROM school.student where sid= $1 ORDER BY sid", [studentId])).rows;
}

export const getStudentInfobyClassId = async (classId: string) => {

    return (await client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s JOIN school.studentclass sc ON s.sid = sc.sid AND cid =$1 ORDER BY s.sid;", [classId])).rows;
}

export const getStudentInfobyTeacherId = async (teacherId: string) => {
    return (await client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s ,  school.studentclass sc, school.classschedule cs, school.subject su WHERE s.sid = sc.sid AND sc.cid = cs.cid AND cs.ssid = su.suid AND tid=$1 ORDER BY s.sid", [teacherId])).rows;
}

export const getTopperBySubjectId = async (subjectId: string): Promise<any> => {

    return (await client.query("SELECT s.sname FROM school.student s WHERE s.sid IN (SELECT r.sid FROM school.resulttable r WHERE r.mark = (SELECT MAX(mark) FROM school.resulttable WHERE ssid=$1 ORDER BY r.sid));", [subjectId])).rows;
}

export const getToppers = async (topperNumber:string) => {

    return (await client.query("SELECT SUM(r.mark) as total,r.sid,s.sname FROM school.resultTable r , school.student s WHERE s.sid = r.sid GROUP BY r.sid,s.sname ORDER BY  total desc LIMIT $1;",[topperNumber])).rows;
}
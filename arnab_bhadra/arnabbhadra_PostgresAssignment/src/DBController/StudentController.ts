import { Student } from "../Entity/Student";
import {client} from "./Client";

export const insertStudentInfoIntoDB = (studentInfo: any) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.student VALUES ($1,$2,$3,$4);", studentInfo).then((result) => {
                resolve("Successful");
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}




export const getStudentInfoFromDB = (resolve: any, reject: any) => {
    client.connect().then(() => {
        client.query("SELECT * FROM school.student").then((result) => {
            //client.end();
            resolve(result.rows);

        }).catch(() => {
            //client.end();
            reject(false);
        }).finally(() => {
            //client.end();

        });
    });
}

export const getStudentInfobyStudentIdFromDB = (studentId: string) => {
    const getStudentPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("SELECT * FROM school.student where sid= $1", [studentId]).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return getStudentPromise;
}

export const getStudentInfobyClassIdFromDB = (classId: string) => {
    const getStudentPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s JOIN school.studentclass sc ON s.sid = sc.sid AND cid =$1;", [classId]).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return getStudentPromise;
}

export const getStudentInfobyTeacherIdFromDB = (teacherId: string) => {
    const getStudentPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("SELECT DISTINCT s.sid, s.sname,s.rollno,s.address FROM school.student s ,  school.studentclass sc, school.classschedule cs, school.subject su WHERE s.sid = sc.sid AND sc.cid = cs.cid AND cs.ssid = su.suid AND tid=$1", [teacherId]).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return getStudentPromise;
}

export const getTopperBySubjectIdFromDB = (subjectId: string) => {
    const getStudentPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("SELECT s.sname FROM school.student s WHERE s.sid IN (SELECT r.sid FROM school.resulttable r WHERE r.mark = (SELECT MAX(mark) FROM school.resulttable WHERE ssid=$1));", [subjectId]).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return getStudentPromise;
}

export const getToppersFromDB = () => {
    const getStudentPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("SELECT SUM(r.mark) as total,r.sid,s.sname FROM school.resultTable r , school.student s WHERE s.sid = r.sid GROUP BY r.sid,s.sname ORDER BY  total desc LIMIT 10;").then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return getStudentPromise;
}
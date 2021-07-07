import * as koa from 'koa';
import * as koaroute from '@koa/router';
//import * as bodyparser from 'koa-bodyparser';
var bodyparser = require('koa-bodyparser');
import { Client, Pool } from 'pg';
import * as uuid from 'uuid';
const errorMessage: string = "Interal error occured. Try after some time";
const pageNotFoundMessage: string = 'Page Not Found';
const invalidPageMessage = "Page and (or) size invalid";
const invalidInputMessage = "Invalid Input";
// const client: Client = new Client({
//     user: "arnab",
//     password: "1234",
//     host: "127.0.0.1",
//     port: 5432,
//     database: "zopsmart"
// });
const client: Pool = new Pool({
    user: "arnab",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "zopsmart"
});
type page = {
    page: number;
    size: number;
}

const router: any = new koaroute();
const app: koa<koa.DefaultState, koa.DefaultContext> = new koa();

const validationPageAndPageSize = function (pageSize: page, noOfrecords: number): Array<number> | boolean {
    if (Number.isInteger(pageSize.page) && Number.isInteger(pageSize.size)) {
        const maxNumberOfPages = Math.ceil(noOfrecords / pageSize.size);
        let minIndex = 0;
        if (pageSize.page < maxNumberOfPages) {
            minIndex = pageSize.page * pageSize.size;
            let maxIndex = noOfrecords < pageSize.size ? noOfrecords : pageSize.size * (pageSize.page + 1);
            return [minIndex, maxIndex];
        }
        else {
            return false;
        }

    }
    else {
        return false;
    }
}

const insertStudentInfoIntoDB = (studentInfo) => {
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



const getStudentInfoFromDB = (resolve: any, reject: any) => {
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

const getStudentInfobyStudentIdFromDB = (studentId: string) => {
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

const getStudentInfobyClassIdFromDB = (classId: string) => {
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

const getStudentInfobyTeacherIdFromDB = (teacherId: string) => {
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



const getTeacherInfoFromDB = (resolve: any, reject: any) => {
    client.connect().then(() => {
        client.query("SELECT * FROM school.teacher").then((result) => {
            resolve(result.rows);
        }).catch(() => {

            reject(false);
        }).finally(() => {
            //client.end();

        });
    });
}

const insertTeacherInfoIntoDB = (teacherInfo) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.teacher VALUES ($1,$2,$3,$4);", teacherInfo).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}


const getSubjectInfoFromDB = (resolve: any, reject: any) => {
    client.connect().then(() => {
        client.query("SELECT * FROM school.subject").then((result) => {
            resolve(result.rows);
        }).catch(() => {

            reject(false);
        }).finally(() => {
            //client.end();

        });
    });
}

const insertSubjectInfoIntoDB = (subjectInfo) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.subject VALUES ($1,$2,$3,$4);", subjectInfo).then((result) => {
                resolve(result.rows);
            }).catch(() => {
                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}


const insertClassScheduleInfoIntoDB = (classScheduleinfo) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.classschedule VALUES ($1,$2,$3,$4);", classScheduleinfo).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}



const getStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(getStudentInfoFromDB);
    var studentinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        studentinfo = data;
        console.log(studentinfo);
        if (studentinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no student information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, studentinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = studentinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;

        ctx.body = errorMessage;
    });
}

const getTeacherInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(getTeacherInfoFromDB);
    var teacherinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        teacherinfo = data;
        console.log(teacherinfo);
        if (teacherinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no teacher information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, teacherinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = teacherinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;

        ctx.body = errorMessage;
    });
}

const getSubjectInfo = async (ctx: koa.Context, next: koa.Next) => {
    const promiseDB: Promise<unknown> = new Promise(getSubjectInfoFromDB);
    var subjectinfo: any;
    var pageSizeData: page = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)
    }

    await promiseDB.then((data) => {
        subjectinfo = data;
        console.log(subjectinfo);
        if (subjectinfo.length === 0) {
            ctx.status = 200;
            ctx.body = "There is no subject information.";
        }
        else {

            const rangeOfInformation: boolean | Array<number> = validationPageAndPageSize(pageSizeData, subjectinfo.length);
            if (rangeOfInformation === false) {
                ctx.status = 406;
                ctx.body = invalidPageMessage;
            }
            else {
                ctx.status = 200;
                ctx.body = subjectinfo.slice(rangeOfInformation[0], rangeOfInformation[1]);
            }
        }
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });
}

const getStudentInfoByStudentid = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await getStudentInfobyStudentIdFromDB(id).then((data) => {
        studentInfo = data;
        if (studentInfo.length === 0) {
            ctx.status = 204;
            ctx.body = "No data to send";
        }
        else {
            ctx.status = 200;
            ctx.body = studentInfo;
        }

    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });

}

const getStudentInfoByTeacherId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await getStudentInfobyTeacherIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });

}

const getStudentInfoByClassId = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await getStudentInfobyClassIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });

}
type student = {
    sid: string,
    sname: string,
    rollno: number,
    address: string | null,
}
const insertStudentInfo = async (ctx: koa.Context, next: koa.Next) => {
    var studentInfo: any = ctx.request.body;
    console.log(ctx);
    if (studentInfo !== undefined && studentInfo.name !== undefined && studentInfo.rollno !== undefined) {
        var address: string | null = null;
        if (studentInfo.address !== undefined) {
            address = studentInfo.address;
        }
        const studentEntity: student = {
            sid: uuid.v4(),
            sname: studentInfo.name,
            rollno: studentInfo.rollno,
            address: address
        }
        await insertStudentInfoIntoDB([studentEntity.sid, studentEntity.sname, studentEntity.rollno, studentEntity.address]).then((data) => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch((data) => {
            ctx.status = 406;
            ctx.body = errorMessage;
        })
    }
    else {
        ctx.body = invalidInputMessage;
    }
}

type Teacher = {
    tid: string;
    tname: string;
    specialization: string,
    contactno: number
}
const insertTeacherInfo = async (ctx: koa.Context, next: koa.Next) => {
    var teacherInfo: any = ctx.request.body;
    if (teacherInfo !== undefined && teacherInfo.name !== undefined && teacherInfo.contactno !== undefined) {
        var specialization: null | string = null;
        if (teacherInfo.specialization !== undefined) {
            specialization = teacherInfo.specialization;
        }
        const teacherEntity: Teacher = {
            tid: uuid.v4(),
            tname: teacherInfo.name,
            contactno: teacherInfo.contactno,
            specialization: specialization
        }
        await insertTeacherInfoIntoDB([teacherEntity.tid, teacherEntity.tname, teacherEntity.specialization, teacherEntity.contactno]).then((data) => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch((data) => {
            ctx.status = 406;
            ctx.body = errorMessage;
        });
    }
    else {
        ctx.body = invalidInputMessage;
    }
}

type Subject = {
    suid: string;
    sname: string;
    tid: string,
    alternatetid: string
}


const insertSubjectInfo = async (ctx: koa.Context, next: koa.Next) => {
    var subjectInfo: any = ctx.request.body;
    if (subjectInfo.name !== undefined) {
        var suid: string | null = uuid.v4();
        var alternatetid: string | null = null;
        var tid: string | null = null;
        if (subjectInfo.tid !== undefined) {
            tid = subjectInfo.tid;
        }
        if (subjectInfo.atid !== undefined) {
            alternatetid = subjectInfo.atid;
        }
        const subjectEntity: Subject = {
            suid: uuid.v4(),
            sname: subjectInfo.name,
            tid: tid,
            alternatetid: alternatetid
        }
        await insertSubjectInfoIntoDB([subjectEntity.suid, subjectEntity.sname, subjectEntity.tid, subjectEntity.alternatetid]).then(() => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch(() => {
            ctx.status = 406;
            ctx.body = errorMessage;
        });
    }
    else {
        ctx.body = invalidInputMessage;
    }
}
type ClassSchedule = {
    cid: string,
    ssid: string,
    starttime: string,
    endtime: string
}
const insertClassScheduleInfo = async (ctx: koa.Context, next: koa.Next) => {
    var classScheduleInfo: any = ctx.request.body;
    if (classScheduleInfo !== undefined && classScheduleInfo.ssid !== undefined && classScheduleInfo.start !== undefined && classScheduleInfo.end !== undefined) {
        const classScheduleEntity: ClassSchedule = {
            cid: uuid.v4(),
            ssid: classScheduleInfo.ssid,
            starttime: classScheduleInfo.start,
            endtime: classScheduleInfo.end
        }
        await insertClassScheduleInfoIntoDB([classScheduleEntity.cid, classScheduleEntity.ssid, classScheduleEntity.starttime, classScheduleEntity.endtime]).then(() => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch(() => {
            ctx.status = 406;
            ctx.body = errorMessage;
        });
    }
    else {
        ctx.body = invalidInputMessage;
    }
}

const insertResultInfoIntoDB = (resultInfo) => {
    const insertDBPromise = new Promise((resolve: any, reject: any) => {
        client.connect().then(() => {
            client.query("INSERT INTO school.resulttable VALUES ($1,$2,$3);", resultInfo).then((result) => {
                resolve(result.rows);
            }).catch(() => {

                reject(false);
            }).finally(() => {
                //client.end();

            });
        });
    });
    return insertDBPromise;
}
type Result = {
    sid: string,
    ssid: string,
    mark: number
}
const insertResultInfo = async (ctx: koa.Context, next: koa.Next) => {
    var resultInfo: any = ctx.request.body;
    if (resultInfo.student !== undefined && resultInfo.subject !== undefined && resultInfo.mark !== undefined) {
        const resultEntity: Result = {
            sid: resultInfo.student,
            ssid: resultInfo.subject,
            mark: resultInfo.mark
        }
        await insertResultInfoIntoDB([resultEntity.ssid, resultEntity.ssid, resultEntity.mark]).then(() => {
            ctx.status = 200;
            ctx.body = "Data inserted successfully";
        }).catch(() => {
            ctx.status = 406;
            ctx.body = errorMessage;
        });
    }
    else {
        ctx.body = invalidInputMessage;
    }
}


const getToperBySubject = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await getTopperBySubjectIdFromDB(id).then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });
}
const getTopperBySubjectIdFromDB = (subjectId: string) => {
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
const getTopperOftheClass = async (ctx: koa.Context, next: koa.Next) => {
    const id: string = ctx.params.id;
    let studentInfo: any;
    await getToppersFromDB().then((data) => {
        studentInfo = data;
        ctx.status = 200;
        ctx.body = studentInfo;
    }).catch((data) => {
        ctx.status = 400;
        ctx.body = errorMessage;
    });
}

const getToppersFromDB = () => {
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


router.get("/student", getStudentInfo);
router.get("/teacher", getTeacherInfo);
router.get('/subject', getSubjectInfo);
router.get("/getstudentbyid/:id", getStudentInfoByStudentid);
router.get("/getstudentbyteacher/:id", getStudentInfoByTeacherId);
router.get("/getstudentbyclass/:id", getStudentInfoByClassId);
router.post("/student", insertStudentInfo);
router.post("/teacher", insertTeacherInfo);
router.post('/subject', insertSubjectInfo);
router.post('/classschedule', insertClassScheduleInfo);
router.get('/result/:id', getToperBySubject);
router.get("/topper", getTopperOftheClass);

app.use(bodyparser())
app.use(router.routes());
app.use(async (ctx: koa.Context) => {
    ctx.status = 404;
    ctx.body = pageNotFoundMessage;
});

module.exports = { app };
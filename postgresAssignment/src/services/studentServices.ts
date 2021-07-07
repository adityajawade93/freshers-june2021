const sql = require('../sqlserver');

async function addStudent(sid: string, name: string, gender: string, phone: string, classId: string) {


    return new Promise((resolve, reject) => {

        sql.query("begin")
            .then(() => {
                return sql.query(
                    "INSERT INTO school.student(SID,NAME,GENDER,PHONE) VALUES ($1,$2,$3,$4)",
                    [sid, name, gender, phone]
                )
            })
            .then(() => {
                return sql.query(
                    "INSERT INTO school.studies_in(SID,CLASSID) VALUES ($1,$2)",
                    [sid, classId]
                )
            })
            .then(() => {
                return sql.query("commit")
            })
            .then(() => {
                resolve("student added")
            })
            .catch((err: any) => {
                reject(err);
                return sql.query("rollback")
            })


    })

}

async function addTeacher(tid: string, name: string, gender: string, phone: string, subjectId: string) {


    return new Promise((resolve, reject) => {
        sql.query("begin")
            .then(() => {
                return sql.query(
                    "INSERT INTO school.teacher(TID,NAME,GENDER,PHONE) VALUES ($1,$2,$3,$4)",
                    [tid, name, gender, phone]
                )
            })
            .then(() => {
                return sql.query(
                    "INSERT INTO school.teacher_takes(TID,SUBJECTID) VALUES ($1,$2)",
                    [tid, subjectId]
                )
            })
            .then(() => {
                return sql.query("commit")
            })
            .then(() => {
                resolve("Teacher added")
            })
            .catch((err: any) => {
                reject(err);
                return sql.query("rollback")
            })

    })

}

async function addSubject(subjectId: string, subjectName: string) {

    let query = `
     INSERT INTO school.subject(SUBJECTID,SUBJECTNAME) VALUES($1,$2);
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [subjectId, subjectName], (err: any, res: any) => {

            if (err)
                reject(err);
            else
                resolve("Subject added");

        })

    })
}

async function addSchedule(classId: string, subjectId: string) {

    let query = `
     INSERT INTO school.schedule(CLASSID,SUBJECTID) VALUES($1,$2);
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [classId, subjectId], (err: any, res: any) => {

            if (err)
                reject(err);
            else
                resolve("Schedule added");

        })

    })
}

async function getStudentcount() {

    let query = `
       SELECT COUNT(*) AS count FROM school.student;
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, (err: any, res: any) => {

            if (err)
                reject(err);
            else
                resolve(res.rows[0].count);

        })

    })


}

async function getStudents(size: any, page: any) {


    let query = `
        SELECT * FROM school.student OFFSET $1 LIMIT $2;
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [page * size, size], (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}

async function getTeachers() {

    let query = `
    SELECT t.tid,t.name,sb.subjectname,t.gender,t.phone
    FROM school.teacher t
    LEFT  JOIN school.teacher_takes tt ON t.tid = tt.tid 
    LEFT  JOIN school.subject sb ON tt.subjectid = sb.subjectid
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}


async function getSubjects() {

    let query = `
        SELECT * FROM school.subject;
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}

async function getClasses() {

    let query = `
        SELECT * FROM school.class;
    `;
    return new Promise((resolve, reject) => {
        sql.query(query, (err: any, res: any) => {

            if (err)
                reject(err);
            else {

                resolve(res.rows);

            }

        })

    })

}


async function getStudentsByClassId(classId: string) {

    let query = `
     
      SELECT s.sid,s.name,s.gender,s.phone,studies_in.classid
      FROM school.student s
      LEFT JOIN school.studies_in ON s.sid = studies_in.sid
      WHERE classid= $1;

    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [classId], (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}

async function getStudentsBySubjectId(subjectId: string) {

    let query = `
      
      SELECT s.sid,s.name,s.gender,s.phone,c.subjectname,c.subjectid
      FROM school.student s
      INNER JOIN school.studies_in ON s.sid = studies_in.sid
      INNER JOIN (
	     SELECT c.classid,sb.subjectname,sb.subjectid
      FROM school.class c 
      INNER  JOIN school.schedule s ON c.classid = s.classid 
      INNER  JOIN school.subject sb ON s.subjectid = sb.subjectid
      WHERE sb.subjectid = $1
      ) c ON studies_in.classid = c.classid;

    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [subjectId], (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}

async function getStudentsByTeacherId(teacherId: string) {

    let query = `
      
      SELECT s.sid,s.name,s.gender,s.phone  , t.name AS teachername , t.subjectname
      FROM school.student s
      INNER JOIN school.studies_in ON s.sid = studies_in.sid
      INNER JOIN(
	  SELECT c.classid , t.tid , t.name , t.subjectname , t.subjectid
      FROM school.class c
      INNER JOIN school.schedule s ON c.classid = s.classid
      INNER JOIN(
	  SELECT t.tid,t.name,sb.subjectname,sb.subjectid
      FROM school.teacher t
      LEFT  JOIN school.teacher_takes tt ON t.tid = tt.tid 
      LEFT  JOIN school.subject sb ON tt.subjectid = sb.subjectid
      WHERE t.tid = $1
      ) t ON s.subjectid = t.subjectid
	  ) t ON studies_in.classid = t.classid;


    `;
    return new Promise((resolve, reject) => {
        sql.query(query, [teacherId], (err: any, res: any) => {

            if (err)
                reject(err);
            else {
                resolve(res.rows);

            }

        })

    })

}





module.exports = {
    addStudent, addTeacher, addSubject, addSchedule, getStudentcount, getStudents, getTeachers, getClasses, getSubjects, getStudentsByClassId, getStudentsBySubjectId
    , getStudentsByTeacherId
}
/* eslint-disable no-console */
/* eslint-disable max-len */
export { };

const client = require('../db.ts');

async function addStudent(studentID: string, name: string, gender: string, phone: string, classID: string) {
  return new Promise((resolve, reject) => {
    client.query('begin')
      .then(() => {
        const query = 'INSERT INTO school.student(studentID,name,gender,phone) VALUES ($1,$2,$3,$4)';
        return client.query(query, [studentID, name, gender, phone]);
      })
      .then(() => client.query('INSERT INTO school.studies_in (studentID,classID) VALUES ($1,$2)',
        [studentID, classID]))
      .then(() => client.query('commit'))
      .then(() => {
        resolve(`${name} added to database`);
      })
      .catch((err: any) => {
        reject(err);
        return client.query('rollback');
      });
  });
}

async function getStudentCount() {
  return new Promise((resolve, reject) => {
    client.query('select count (*) as count from school.student', [], (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res.rows[0].count);
    });
  });
}

async function getStudent(page: number, size: number) {
  console.log('hey student list');
  return new Promise((resolve, reject) => {
    const query = 'select * from school.student order by name offset $1 limit $2';
    client.query(query, [page * size, size], (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
}

async function getStudentFromClassID(id: string) {
  return new Promise((resolve, reject) => {
    client.query(`
        select s.studentid, s.name, class.classid
        from school.student s
        left join school.studies_in on studies_in.studentid = s.studentid
        left join school.class on class.classid = studies_in.classid
        where class.classid = $1 order by s.name`, [id],
    (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

async function getStudentFromSubjectID(id: string) {
  return new Promise((resolve, reject) => {
    client.query(`
        select s.studentid, s.name, class.classid, subject.subjectid
        from school.student s
        left join school.studies_in on studies_in.studentid = s.studentid
        left join school.class on class.classid = studies_in.classid
        left join school.having_subject on class.classid = having_subject.classid
        left join school.subject on subject.subjectid = having_subject.subjectid
        where subject.subjectid = $1 order by s.name`, [id],
    (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

async function getStudentFromTeacherID(id: string) {
  return new Promise((resolve, reject) => {
    client.query(`
        select s.studentid, s.name, class.classid, teacher.teacherid
        from school.student s
        left join school.studies_in on studies_in.studentid = s.studentid
        left join school.class on class.classid = studies_in.classid
        left join school.having_subject on class.classid = having_subject.classid
        left join school.subject on subject.subjectid = having_subject.subjectid
        left join school.takes on subject.subjectid = takes.subjectid
        left join school.teacher on teacher.teacherid = takes.teacherid
        where teacher.teacherid = $1 order by s.name`, [id],
    (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

module.exports = {
  addStudent,
  getStudent,
  getStudentCount,
  getStudentFromClassID,
  getStudentFromSubjectID,
  getStudentFromTeacherID,
};

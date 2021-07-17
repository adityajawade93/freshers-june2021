export { };

const client = require('../db.ts');

async function addMarks(studentID: string, subjectID: string, marks: number) {
  return new Promise((resolve, reject) => {
    client.query('INSERT INTO school.result values ($1,$2,$3)', [studentID, subjectID, marks], (err: any) => {
      if (err) reject(err);
      else resolve('query fetched');
    });
  });
}

async function updateMarks(studentID: string, subjectID: string, marks: number) {
  return new Promise((resolve, reject) => {
    client.query('UPDATE school.result set marks = $3 where studentid = $1 and subjectid = $2', [studentID, subjectID, marks], (err: any) => {
      if (err) reject(err);
      else resolve('query fetched');
    });
  });
}

async function getMarks(studentID: string) {
  return new Promise((resolve, reject) => {
    client.query(`
    select s.name as studentName, subject.name as subjectName,result.marks
    from school.student s
    join school.result on s.studentid = result.studentid
    join school.subject on result.subjectid = subject.subjectid
    where s.studentid =$1`, [studentID],
    (err: any, res: any) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

async function getHighestMarksPerSubject(Classid: string) {
  return new Promise((resolve, reject) => {
    client.query(`select subject.name as subjectname , max(result.marks) as max_marks
    from school.class c
    join school.having_subject on having_subject.classid = c.classid
    join school.subject on subject.subjectid = having_subject.subjectid
    join school.result on result.subjectid = subject.subjectid
    where c.classid= $1
    group by subject.subjectid
    order by subjectname`, [Classid], (err: any, res: { rows: unknown; }) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

async function getToppersMarks(classid: any, toplimit: any) {
  const query = `select s.studentid, s.name, sum(result.marks) as total_marks
    from school.student s
    join school.result on result.studentid = s.studentid
    join school.studies_in on studies_in.studentid = s.studentid
    join school.class on class.classid = studies_in.classid
    where class.classid = $1
    group by s.studentid 
    order by total_marks desc
    limit $2`;

  return new Promise((resolve, reject) => {
    client.query(query, [classid, toplimit], (err: any, res: { rows: unknown; }) => {
      if (err) reject(err);
      else resolve(res.rows);
    });
  });
}

module.exports = {
  addMarks, updateMarks, getMarks, getHighestMarksPerSubject, getToppersMarks,
};

/* eslint-disable no-tabs */
const sqlserver = require('../sqlserver.ts');

async function checkSubject(studentId: string, subjectId: string) {
  const query = `
    SELECT s.sid
    FROM school.student s
    INNER JOIN school.studies_in ON s.sid = studies_in.sid
    INNER JOIN (
	SELECT c.classid,sb.subjectname,sb.subjectid
    FROM school.class c 
    INNER  JOIN school.schedule s ON c.classid = s.classid 
    INNER  JOIN school.subject sb ON s.subjectid = sb.subjectid
    WHERE sb.subjectid = $1
    ) c ON studies_in.classid = c.classid
    WHERE s.sid = $2
   `;
  return new Promise((resolve, reject) => {
    sqlserver.query(query, [subjectId, studentId], (err: any, res: any) => {
      if (err) { reject(err); } else if (res.rows.length === 0) resolve(false);
      else resolve(true);
    });
  });
}

async function addMarks(studentId: string, subjectId: string, marks: number) {
  const query = `
     INSERT INTO school.result(SUBJECTID,SID,marks) VALUES($1,$2,$3);
    `;
  return new Promise((resolve, reject) => {
    sqlserver.query(query, [subjectId, studentId, marks], (err: any) => {
      if (err) { reject(err); } else { resolve('marks added'); }
    });
  });
}

async function updateMarks(studentId: string, subjectId: string, marks: number) {
  const query = `
      UPDATE school.result
      SET marks = $1
      WHERE SUBJECTID = $2 AND SID = $3
    `;
  return new Promise((resolve, reject) => {
    sqlserver.query(query, [marks, subjectId, studentId], (err: any) => {
      if (err) { reject(err); } else { resolve('marks added'); }
    });
  });
}

async function getMarks(studentId: string) {
  const query = `
   SELECT s.subjectname , r.marks
FROM school.result r
LEFT JOIN school.subject s
ON r.subjectid = s.subjectid
WHERE r.sid = $1;
   `;
  return new Promise((resolve, reject) => {
    sqlserver.query(query, [studentId], (err: any, res: any) => {
      if (err) { reject(err); } else {
        resolve(res.rows);
      }
    });
  });
}

async function getHighestMarksPerSubject(classId: string) {
  const query = `
    SELECT s.sid,s.name , a.subjectname , a.max_marks
    FROM(
    SELECT sb.subjectname,MAX(r.marks) AS max_marks
    FROM school.student s
    LEFT JOIN school.studies_in ON studies_in.sid = s.sid
    LEFT JOIN school.class c ON studies_in.classid = c.classid
    LEFT JOIN school.result r ON r.sid = s.sid
    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid
    WHERE c.classid = $1
    GROUP BY subjectname
    ) a
    JOIN (
	SELECT s.SID ,s.name , sb.subjectname , r.marks
    FROM school.student s
    LEFT JOIN school.result r ON r.sid = s.sid
    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid
   ) s

    ON a.max_marks = s.marks AND a.subjectname = s.subjectname;

   `;
  return new Promise((resolve, reject) => {
    sqlserver.query(query, [classId], (err: any, res: any) => {
      if (err) { reject(err); } else {
        resolve(res.rows);
      }
    });
  });
}

async function getTop10Marks(classId: string, count : number) {
  const query = `
    SELECT s.sid , s.name , a.total_marks
    FROM school.student s
    INNER JOIN(
    SELECT SUM(r.marks) AS total_marks , s.sid
    FROM school.student s
    JOIN school.studies_in ON studies_in.sid = s.sid
    JOIN school.class c ON studies_in.classid = c.classid
    JOIN school.result r ON r.sid = s.sid
    WHERE c.classid =  $1
    GROUP BY s.sid
    ) a
    ON s.sid = a.sid
    ORDER BY total_marks DESC
    LIMIT $2
    `;

  return new Promise((resolve, reject) => {
    sqlserver.query(query, [classId, count], (err: any, res: any) => {
      if (err) { reject(err); } else {
        resolve(res.rows);
      }
    });
  });
}

module.exports = {
  checkSubject, addMarks, updateMarks, getMarks, getHighestMarksPerSubject, getTop10Marks,
};

import sqlclient from '../database/db';

export async function gettopperByclassIdAndSubjectId(classId:number, subjectId:number) {
  try {
    return (await sqlclient.query(`SELECT student_id,fname,S.marks FROM (SELECT * FROM College.result WHERE clas_id=${classId} AND subjectid=${subjectId} ORDER BY marks DESC) AS S,College.Student WHERE S.studentid=student_id LIMIT 1 ORDER BY fname`));
  } catch (e) {
    throw Error(e);
  }
}

export async function gettopstudent(classId:number, count:number) {
  try {
    return (await sqlclient.query(`SELECT s.student_id , s.fname , a.total_marks
          FROM College.student s
          INNER JOIN(
          SELECT SUM(r.marks) AS total_marks , s.student_id
          FROM college.student s
          JOIN college.class_student ON class_student.studid = s.student_id
          JOIN college.class_schedule c ON class_student.class_id = c.classid
          JOIN college.result r ON r.studentid = s.student_id
          WHERE c.classid =${classId}
          GROUP BY s.student_id
          ) a
          ON s.student_id = a.student_id
          ORDER BY total_marks DESC
          LIMIT ${count} ORDER BY s.fname`));
  } catch (e) {
    throw Error(e);
  }
}

const topSql = require('../database/dbconnect')

exports.get_topper_by_classId_and_subjectId = async (
  classId: number,
  subjectId: number
) => {
  try {
    await topSql.query("set search_path to myschool");
    return await topSql.query(
      `select s.studentId,s.name,r.marks from (select * from result where class_Id=${classId} 
      and subject_Id=${subjectId} order by marks desc) as r,students as s
      where r.studentid=s.studentId limit 1`
    );
  } catch (err) {
    throw err;
  }
};

exports.get_topten_students = async (classId: number) => {
  try {
    await topSql.query("set search_path to myschool");
    return await topSql.query(`select s.studentId , s.name , a.total_marks
            from myschool.students s
            inner join(
            select sum(r.marks) AS total_marks , s.studentId
            from myschool.students s
            join myschool.classes ON classes.stId = s.studentId
            join myschool.class_schedule c ON classes.classId = c.cls_Id
            join myschool.result r ON r.studentid = s.studentId
            where c.cls_Id =${classId}
            group by s.studentId
            ) a 
            on s.studentId = a.studentId
            order BY total_marks desc
            limit 10`);
  } catch (err) {
    throw err;
  }
};

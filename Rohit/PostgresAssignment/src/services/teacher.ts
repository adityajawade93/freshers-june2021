const teacherSql = require("../database/dbconnect");

exports.get_teacher = async () => {
  return await teacherSql.query("select * from myschool.teachers order by teacherId");
};

exports.add_teacher = async (
  teacherId: number,
  teacher_fname: string,
  teacher_lname: string,
  gender: string
) => {
  const data = [teacherId, teacher_fname, teacher_lname, gender];
  return await teacherSql.query(
    "insert into myschool.teachers values($1,$2,$3,$4)",
    data
  );
};

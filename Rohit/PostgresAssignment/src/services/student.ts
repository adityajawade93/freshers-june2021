const studentSql = require("../database/dbconnect");

exports.get_student = async () => {
  return await studentSql.query("select * from myschool.students order by studentId");
};

exports.get_student_length = async () => {
  return await studentSql.query("select Count(*) from myschool.students");
};

exports.get_student_by_classid = async (classId: number) => {
  return await studentSql.query(
    `select S.studentId,S.name,S.dob,S.gender from myschool.students as S,myschool.classes 
    where classId=${classId} and studentId=stId order by studentId`
  );
};

exports.get_student_by_teacherid = async (teacherId: number) => {
  return await studentSql.query(
    `select S.studentId,S.name,S.dob,S.gender from myschool.students as S,myschool.classes,myschool.class_schedule 
    where teach_Id=${teacherId} and classId=cls_Id and stId=studentId order by studentId`
  );
};

exports.get_student_by_subjectid = async (subjectId: number) => {
  return await studentSql.query(
    `select S.studentId,S.name,S.dob,S.gender from myschool.students AS S,myschool.classes,myschool.class_schedule 
      where subjId=${subjectId} and classId=cls_Id and stId=studentId order by studentId`
  );
};

exports.add_student = async (
  studentId: number,
  name: string,
  dob: string,
  gender: string
) => {
  const data = [studentId, name, dob, gender];
  return await studentSql.query(
    "insert into myschool.students values($1,$2,$3,$4)",
    data
  );
};

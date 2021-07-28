const classSql = require("../database/dbconnect");

exports.get_classes = async () => {
  return await classSql.query("select * from myschool.classes order by classId");
};

exports.add_student_to_class = async (classId: number, stId: number) => {
  const data = [classId, stId];
  return await classSql.query(
    "insert into myschool.classes values($1,$2)",
    data
  );
};

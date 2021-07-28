const subjecteSql = require("../database/dbconnect");

exports.get_subject = async () => {
  return await subjecteSql.query("select * from myschool.subject order by subjectId");
};

exports.add_subject = async (subjectId: number, subject_name: string) => {
  const data = [subjectId, subject_name];
  return await subjecteSql.query(
    "insert into myschool.subject values($1,$2)",
    data
  );
};

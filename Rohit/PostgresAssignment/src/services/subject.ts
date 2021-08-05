const subjecteSql = require("../database/dbconnect");

exports.get_subject = async () => {
  return await subjecteSql.query("select * from myschool.subject order by subjectId");
};

exports.add_subject = async (subjectId: number, subject_name: string) => {
  return await subjecteSql.query(
    "insert into myschool.subject values($1,$2)",
    [subjectId, subject_name]
  );
};

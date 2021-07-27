const resultSql = require("../database/dbconnect");

exports.get_result = async () => {
  return await resultSql.query(
    "select * from myschool.result order by studentid"
  );
};

exports.add_result = async (
  studentid: number,
  class_Id: number,
  subject_Id: number,
  marks: number
) => {
  const data = [studentid, class_Id, subject_Id, marks];
  return await resultSql.query(
    "insert into myschool.result values($1,$2,$3,$4)",
    data
  );
};

exports.update_result = async (
  studentid: number,
  subject_Id: number,
  marks: number
) => {
  const data = [studentid, subject_Id, marks];
  return await resultSql.query(
    `update myschool.result set marks=${marks} where studentid=${studentid} and subject_Id=${subject_Id}`
  );
};

const resultSql = require('../database/dbconnect')

exports.get_result = async () => {
  try {
    await resultSql.query("set search_path to myschool");
    return await resultSql.query("select * from result");
  } catch (err) {
    throw err;
  }
};

exports.add_result = async (
  studentid: number,
  class_Id: number,
  subject_Id: number,
  marks: number
) => {
  try {
    await resultSql.query("set search_path to myschool");
    const data = [studentid, class_Id, subject_Id, marks];
    return await resultSql.query(
      "insert into result values($1,$2,$3,$4)",
      data
    );
  } catch (err) {
    throw err;
  }
};

exports.update_result = async (
  studentid: number,
  subject_Id: number,
  marks: number
) => {
  await resultSql.query("set search_path to myschool");
  const data = [studentid, subject_Id, marks];
  return await resultSql.query(
    `update result set marks=${marks} where studentid=${studentid} and subject_Id=${subject_Id}`
  );
};

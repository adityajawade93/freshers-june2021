const resultClient = require("../database/dbconnect");

exports.get_result = async () => {
  try {
    await resultClient.query("set search_path to myschool");
    return await resultClient.query("select * from result");
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
    await resultClient.query("set search_path to myschool");
    const data = [studentid, class_Id, subject_Id, marks];
    return await resultClient.query(
      "insert into result values($1,$2,$3,$4)",
      data
    );
  } catch (err) {
    throw err;
  }
};

exports.check_subject = async (studentId: number) => {
  await resultClient.query("set search_path to myschool");
  return await resultClient.query(
    `select subjId from class_schedule,classes where stId=${studentId} and cls_Id=classId`
  );
};

exports.subject_length = async (studentId: number) => {
  await resultClient.query("set search_path to myschool");
  return await resultClient.query(
    `select count(*) from (select subjId from class_schedule,classes 
      where stId=${studentId} and cls_Id=classId) as S`
  );
};

exports.update_result = async (
  studentid: number,
  subject_Id: number,
  marks: number
) => {
  await resultClient.query("set search_path to myschool");
  const data = [studentid, subject_Id, marks];
  return await resultClient.query(
    `update result set marks=${marks} where studentid=${studentid} and subjectid=${subject_Id}`
  );
};

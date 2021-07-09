const marksClient = require("../database/dbconnect");

exports.get_subjectmarks_by_studentid = async (studentId: number) => {
  try {
    await marksClient.query("set search_path to myschool");
    return await marksClient.query(
      `select subjectId,subject_name,marks from result,subject where studentid=${studentId} and subject_Id=subjectId`
    );
  } catch (err) {
    throw err;
  }
};

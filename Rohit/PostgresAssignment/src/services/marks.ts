const marksSql = require("../database/dbconnect");

exports.get_subjectmarks_by_studentid = async (studentId: number) => {
  return await marksSql.query(
    `select subjectId,subject_name,marks from myschool.result,myschool.subject 
      where studentid=${studentId} and subject_Id=subjectId`
  );
};

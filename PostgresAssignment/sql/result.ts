const resultclient = require("../database/dbconnect");

exports.get_result = async () => {
    await resultclient.query("set search_path to myschool");
    return await resultclient.query("select * from result");
  };

  exports.add_result = async (
    result_id: number,
    studentid: number,
    clas_id: number,
    subjectid: number,
    marks: number
  ) => {
    await resultclient.query("set search_path to myschool");
    const data = [result_id, studentid, clas_id, subjectid, marks];
    return await resultclient.query(
      "insert into result values($1,$2,$3,$4,$5)",
      data
    );
  };

  exports.check_subject = async (studentid: number) => {
    await resultclient.query("set search_path to myschool");
    return await resultclient.query(
      `select subj_id from class_schedule,classes where st_id=${studentid} and classid=cls_id`
    );
  };
  
  exports.subject_length = async (studentid: number) => {
    await resultclient.query("set search_path to myschool");
    return await resultclient.query(
      `select count(*) from (select subj_id from class_schedule,classes where st_id=${studentid} and classid=cls_id) as S`
    );
  };
  
  exports.update_result = async (
    studentid: number,
    subjectid: number,
    marks: number
  ) => {
    await resultclient.query("set search_path to myschool");
    const data = [studentid, subjectid, marks];
    return await resultclient.query(
      `update result set marks=${marks} where studentid=${studentid} and subjectid=${subjectid}`
    );
  };
  
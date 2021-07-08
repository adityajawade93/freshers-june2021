const stdclient = require("../database/dbconnect");

exports.get_student = async () => {
    await stdclient.query("set search_path to myschool");
    return await stdclient.query("select * from students");
  };

  
exports.get_student_length = async () => {
    await stdclient.query("set search_path to myschool");
    return await stdclient.query("select Count(*) from students");
  };
  

  exports.get_student_by_classid = async (id: number) => {
    await stdclient.query("set search_path to myschool");
    return await stdclient.query(
      `select S.s_id,S.s_name from students as S,classes where cls_id=${id} and st_id=s_id`
    );
  };

  exports.get_student_by_teacherid = async (id: number) => {
    await stdclient.query("set search_path to myschool");
    return await stdclient.query(
      `select S.s_id,S.s_name from students as S,classes,class_schedule where tch_id=${id} and cls_id=classid and st_id=s_id`
    );
  };
  
  exports.get_student_by_subjectid = async (id: number) => {
    await stdclient.query("set search_path to myschool");
    return await stdclient.query(
      `select S.s_id,S.s_name from students AS S,classes,class_schedule where subj_id=${id} and cls_id=classid and st_id=s_id`
    );
  };
  
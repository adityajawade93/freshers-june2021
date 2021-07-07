const topclient = require("../database/dbconnect");

exports.get_topper_by_classid_and_subjectid = async (
    c_id: number,
    sub_id: number
  ) => {
    await topclient.query("set search_path to myschool");
    return await topclient.query(
      `select s_id,s_name,S.marks from (select * from result where clas_id=${c_id} and subjectid=${sub_id} order by marks desc) as S,students where S.studentid=s_id limit 1`
    );
  };

  exports.get_topten_students = async (c_id: number) => {
    await topclient.query("set search_path to myschool");
    return await topclient.query(`select s.s_id , s.s_name , a.total_marks
            from myschool.students s
            inner join(
            select sum(r.marks) AS total_marks , s.s_id
            from myschool.students s
            join myschool.classes ON classes.st_id = s.s_id
            join myschool.class_schedule c ON classes.cls_id = c.classid
            join myschool.result r ON r.studentid = s.s_id
            where c.classid =${c_id}
            group by s.s_id
            ) a 
            on s.s_id = a.s_id
            order BY total_marks desc
            limit 10`);
  };
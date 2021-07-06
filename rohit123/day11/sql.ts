const sqlclient = require("./index");

exports.get_teacher = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from teachers");
};

exports.get_student = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from students");
};

exports.get_subject = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from subject");
};

exports.check_subject = async (studentid: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select subj_id from class_schedule,classes where st_id=${studentid} and classid=cls_id`
  );
};

exports.subject_length = async (studentid: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select count(*) from (select subj_id from class_schedule,classes where st_id=${studentid} and classid=cls_id) as S`
  );
};

exports.get_class_schedule = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from class_schedule");
};

exports.get_classes = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from classes");
};


exports.get_result = async () => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query("select * from result");
};

exports.get_student_by_classid = async (id: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select S.s_id,S.s_name from students as S,classes where cls_id=${id} and st_id=s_id`
  );
};

exports.get_student_by_teacherid = async (id: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select S.s_id,S.s_name from students as S,classes,class_schedule where tch_id=${id} and cls_id=classid and st_id=s_id`
  );
};

exports.get_student_by_subjectid = async (id: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select S.s_id,S.s_name from students AS S,classes,class_schedule where subj_id=${id} and cls_id=classid and st_id=s_id`
  );
};

exports.get_subjectmarks_by_studentid = async (id: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select sub_id,sub_name,marks from result,subject where studentid=${id} and subjectid=sub_id`
  );
};

exports.get_topper_by_classid_and_subjectid = async (
  c_id: number,
  sub_id: number
) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(
    `select s_id,s_name,S.marks from (select * from result where clas_id=${c_id} and subjectid=${sub_id} order by marks desc) as S,students where S.studentid=s_id limit 1`
  );
};

exports.get_topten_students = async (c_id: number) => {
  await sqlclient.query("set search_path to myschool");
  return await sqlclient.query(`select s.s_id , s.s_name , a.total_marks
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

exports.add_student = async (
  s_id: number,
  s_name: string,
  dob: string,
  gender: string
) => {
  await sqlclient.query("set search_path to myschool");
  const data = [s_id, s_name, dob, gender];
  return await sqlclient.query(
    "insert into students values($1,$2,$3,$4)",
    data
  );
};

exports.add_teacher = async (
  t_id: number,
  t_fname: string,
  t_lname: string,
  gender: string
) => {
  await sqlclient.query("set search_path to myschool");
  const data = [t_id, t_fname, t_lname, gender];
  return await sqlclient.query(
    "insert into teachers values($1,$2,$3,$4)",
    data
  );
};

exports.add_student_in_class = async (cls_id: number, st_id: number) => {
  await sqlclient.query("set search_path to myschool");
  const data = [cls_id, st_id];
  return await sqlclient.query("insert into classes values($1,$2)", data);
};

exports.add_subject = async (sub_id: number, sub_name: string) => {
  await sqlclient.query("set search_path to myschool");
  const data = [sub_id, sub_name];
  return await sqlclient.query("insert into subject values($1,$2)", data);
};

exports.add_class_schedule = async (
  classid: number,
  classno: number,
  subj_id: number,
  subj_name: string,
  tch_id: number,
  tch_fname: string
) => {
  await sqlclient.query("set search_path to myschool");
  const data = [classid, classno, subj_id, subj_name, tch_id, tch_fname];
  return await sqlclient.query(
    "insert into class_schedule values($1,$2,$3,$4,$5,$6)",
    data
  );
};

exports.add_result = async (
  result_id: number,
  studentid: number,
  clas_id: number,
  subjectid: number,
  marks: number
) => {
  await sqlclient.query("set search_path to myschool");
  const data = [result_id, studentid, clas_id, subjectid, marks];
  return await sqlclient.query(
    "insert into result values($1,$2,$3,$4,$5)",
    data
  );
};

exports.update_result = async (
  studentid: number,
  subjectid: number,
  marks: number
) => {
  await sqlclient.query("set search_path to myschool");
  const data = [studentid, subjectid, marks];
  return await sqlclient.query(
    `update result set marks=${marks} where studentid=${studentid} and subjectid=${subjectid}`
  );
};

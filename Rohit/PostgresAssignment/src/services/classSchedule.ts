const scheduleSql = require("../database/dbconnect");

exports.get_class_schedule = async () => {
  return await scheduleSql.query(
    "select * from myschool.class_schedule order by cls_Id"
  );
};

exports.add_class_schedule = async (
  cls_Id: number,
  subjId: number,
  subject_name: string,
  teach_Id: number,
  teacher_fname: string
) => {
  return await scheduleSql.query(
    "insert into myschool.class_schedule(cls_Id, subjId, subject_name, teach_Id, teacher_fname) values($1,$2,$3,$4,$5)",
    [cls_Id, subjId, subject_name, teach_Id, teacher_fname]
  );
};

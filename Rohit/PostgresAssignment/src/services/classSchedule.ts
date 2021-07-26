const scheduleSql = require('../database/dbconnect')

exports.get_class_schedule = async () => {
  try {
    await scheduleSql.query("set search_path to myschool");
    return await scheduleSql.query("select * from class_schedule");
  } catch (err) {
    throw err;
  }
};

exports.add_class_schedule = async (
  cls_Id: number,
  subjId: number,
  subject_name: string,
  teach_Id: number,
  teacher_fname: string
) => {
  try {
    const data = [cls_Id, subjId, subject_name, teach_Id, teacher_fname];
    return await scheduleSql.query(
      "insert into myschool.class_schedule(cls_Id, subjId, subject_name, teach_Id, teacher_fname) values($1,$2,$3,$4,$5)",
      data
    );
  } catch (err) {
    throw err;
  }
};

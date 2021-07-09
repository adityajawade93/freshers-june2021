const scheduleClient = require("../database/dbconnect");

exports.get_class_schedule = async () => {
  try {
    await scheduleClient.query("set search_path to myschool");
    return await scheduleClient.query("select * from class_schedule");
  } catch (err) {
    throw err;
  }
};

exports.add_class_schedule = async (
  cls_Id: number,
  classno: number,
  subjId: number,
  subject_name: string,
  teach_Id: number,
  teacher_fname: string
) => {
  try {
    await scheduleClient.query("set search_path to myschool");
    const data = [cls_Id, classno, subjId, subject_name, teach_Id, teacher_fname];
    return await scheduleClient.query(
      "insert into class_schedule values($1,$2,$3,$4,$5,$6)",
      data
    );
  } catch (err) {
    throw err;
  }
};

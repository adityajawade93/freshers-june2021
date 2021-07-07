const schedclient = require("../database/dbconnect");

exports.get_class_schedule = async () => {
    await schedclient.query("set search_path to myschool");
    return await schedclient.query("select * from class_schedule");
  };

exports.add_class_schedule = async (
    classid: number,
    classno: number,
    subj_id: number,
    subj_name: string,
    tch_id: number,
    tch_fname: string
  ) => {
    await schedclient.query("set search_path to myschool");
    const data = [classid, classno, subj_id, subj_name, tch_id, tch_fname];
    return await schedclient.query(
      "insert into class_schedule values($1,$2,$3,$4,$5,$6)",
      data
    );
  };
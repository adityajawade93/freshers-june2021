const clsclient = require("../database/dbconnect");

exports.get_classes = async () => {
    await clsclient.query("set search_path to myschool");
    return await clsclient.query("select * from classes");
  };
  
  exports.add_student_in_class = async (cls_id: number, st_id: number) => {
    await clsclient.query("set search_path to myschool");
    const data = [cls_id, st_id];
    return await clsclient.query("insert into classes values($1,$2)", data);
  };
  
const subjclient = require("../database/dbconnect");

exports.get_subject = async () => {
    await subjclient.query("set search_path to myschool");
    return await subjclient.query("select * from subject");
  };

  exports.add_subject = async (sub_id: number, sub_name: string) => {
    await subjclient.query("set search_path to myschool");
    const data = [sub_id, sub_name];
    return await subjclient.query("insert into subject values($1,$2)", data);
  };
  

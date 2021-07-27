import { client as sqlclient } from "../database/db";

export async function add_class_schedule(
  uniclassid: any,
  Standard: number,
  classno: number,
  subcode: number,
  subject: string,
  staffid: number,
  T_fname: string
) {
  try {
    
    const data = [
      uniclassid,
      Standard,
      classno,
      subcode,
      subject,
      staffid,
      T_fname,
    ];
    return await sqlclient.query(
      "INSERT INTO Class_schedule values($1,$2,$3,$4,$5,$6,$7)",
      data
    );
  } catch (e) {
    throw Error(e);
  }
}

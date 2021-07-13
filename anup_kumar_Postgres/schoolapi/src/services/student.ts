import { query } from "../database/index";
import { handle_error } from "../helper/index";

export const all_students = async (limit: number, offset: number) => {
  try {
    const [response, responseError] = await handle_error(
      query(`SELECT * FROM school.student LIMIT ${limit} OFFSET ${offset}`)
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
};

export async function add_students(name: string, classid: string) {
  try {
    const [response, responseError] = await handle_error(
      query(
        `INSERT INTO school.student(name, classid) VALUES ('${name}','${classid}')`
      )
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

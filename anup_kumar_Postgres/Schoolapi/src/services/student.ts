import { query } from "../database/index";
import { handleError } from "../helper/index";

export const AllStudents = async (limit: number, offset: number) => {
  try {
    const [response, responseError] = await handleError(
      query(`SELECT * FROM school.student LIMIT ${limit} OFFSET ${offset}`)
    );

    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
};

export async function AddStudent(name: string, classid: string) {
  try {
    const [response, responseError] = await handleError(
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

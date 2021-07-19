import { query } from "../database/index";
import { handle_error } from "../helper/index";

export async function all_marks() {
  try {
    const [response, responseError] = await handle_error(
      query(`SELECT * FROM school.marks`)
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function add_marks(
  studentid: string,
  subjectid: string,
  marks: number
) {
  try {
    const [, responseError] = await handle_error(
      query(
        `INSERT INTO school.marks(studentid, subjectid, marks) VALUES 
            ('${studentid}','${subjectid}','${marks}')`
      )
    );
    if (responseError) throw new Error(responseError);
    return;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export const topper = async (num: number) => {
  try {
    const [response, responseError] = await handle_error(
      query(
        `select studentid, sum(marks) as total 
            from school.marks  group by marks.studentid order by total desc limit ${num}`
      )
    );
    throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
};

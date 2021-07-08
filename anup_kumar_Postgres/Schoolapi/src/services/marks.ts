import { query } from "../database/index";
import { handleError } from "../helper/index";

export async function AllMarks() {
  try {
    const [response, responseError] = await handleError(
      query(`SELECT * FROM school.marks`)
    );
    if (responseError) throw new Error(responseError);
    return response;
  } catch (e) {
    throw new Error(e.message);
    console.log(e);
  }
}

export async function AddMarks(
  studentid: string,
  subjectid: string,
  marks: number
) {
  try {
    const [, responseError] = await handleError(
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

export const Topper = async (num: number) => {
  try {
    const response = query(
      `select studentid, sum(marks) as total 
            from school.marks  group by marks.studentid order by total desc limit ${num}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
